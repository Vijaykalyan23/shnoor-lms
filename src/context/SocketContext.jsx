import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { auth } from '../auth/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [unreadCounts, setUnreadCounts] = useState({});

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    const activeChatRef = React.useRef(null);
    const handleSetActiveChat = React.useCallback((chatId) => {
        console.log("SetActiveChat called with:", chatId);
        activeChatRef.current = chatId;
    }, []);

    useEffect(() => {
        if (!socket) return;

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                socket.emit('join_user', user.uid);

                const fetchUnread = async () => {
                    try {
                        const res = await axios.get('http://localhost:3001/api/chats', {
                            params: { firebase_uid: user.uid }
                        });
                        const counts = {};
                        res.data.forEach(chat => {
                            if (chat.unread_count > 0) {
                                counts[chat.chat_id] = chat.unread_count;
                            }
                        });
                        setUnreadCounts(counts);
                    } catch (err) {
                        console.error("Failed to fetch unread counts", err);
                    }
                };
                fetchUnread();

                socket.on('new_notification', (msg) => {
                    const currentActive = activeChatRef.current;
                    const isChatActive = currentActive && String(currentActive) === String(msg.chat_id);

                    // 1. Play Sound (Global) - WhatsApp style
                    // Only play if we are NOT in the active chat, OR if the window is hidden/blurred
                    if (!isChatActive || document.hidden) {
                        try {
                            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
                            audio.play().catch(e => console.warn("Audio blocked:", e));
                        } catch (error) { console.error("Audio error:", error); }
                    }

                    // 2. Browser Notification
                    if (document.hidden || !isChatActive) {
                        if (Notification.permission === "granted") {
                            new Notification(`New message from ${msg.sender_name || msg.sender_uid}`, {
                                body: msg.text || "Sent an attachment",
                                icon: '/pwa-192x192.png' // Ensure this exists or use a placeholder
                            });
                        }
                    }

                    // 3. Update Unread Count (Internal)
                    // Check if this chat is currently currently active/open
                    if (isChatActive) {
                        console.log("Blocking unread increment for active chat:", msg.chat_id);
                        return;
                    }

                    setUnreadCounts(prev => {
                        const newCount = (prev[msg.chat_id] || 0) + 1;
                        console.log(`Updating count for ${msg.chat_id}: ${prev[msg.chat_id]} -> ${newCount}`);
                        return {
                            ...prev,
                            [msg.chat_id]: newCount
                        };
                    });
                });

                // Request Notification Permission (if supported and not granted/denied)
                if ("Notification" in window && Notification.permission === "default") {
                    Notification.requestPermission();
                }
            } else {
                setUnreadCounts({});
            }
        });

        return () => {
            unsubscribe();
            socket.off('new_notification');
        };
    }, [socket]);

    const markChatRead = (chatId) => {
        setUnreadCounts(prev => {
            const newCounts = { ...prev };
            delete newCounts[chatId];
            return newCounts;
        });
    };

    const value = {
        socket,
        unreadCounts,
        setUnreadCounts,
        markChatRead,
        handleSetActiveChat
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
