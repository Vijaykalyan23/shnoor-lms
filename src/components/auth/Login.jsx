
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { auth, googleProvider, db } from '../../firebase'; 
import { FaEye, FaEyeSlash, FaSignInAlt, FaGoogle } from 'react-icons/fa'; 
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail && rememberedEmail !== 'admin@shnoor.com') {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const checkRoleAndRedirect = async (user) => {
    console.log("Step 2: Checking Role in DB..."); 
    
    try {
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000, 'timeout'));
      const dbPromise = getDoc(doc(db, "users", user.uid));

      const result = await Promise.race([dbPromise, timeoutPromise]);

      if (result === 'timeout') {
        console.warn("Database too slow, forcing fallback redirect.");
        if (user.email.includes('admin')) navigate('/admin/dashboard');
        else navigate('/company/overview');
        return;
      }

      const userDoc = result; 
      
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        console.log("Role found:", role); 
        if (role === 'admin') navigate('/admin/dashboard');
        else if (role === 'student') navigate('/learner/dashboard');
        else navigate('/company/overview'); 
      } else {
        console.log("No DB record found, using fallback.");
        if (user.email.includes('admin')) navigate('/admin/dashboard');
        else navigate('/company/overview');
      }
    } catch (err) {
      console.error("Role check failed:", err);
      navigate('/company/overview');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log("Step 1: Authenticating..."); 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');

      await checkRoleAndRedirect(userCredential.user);
    } catch (err) {
      console.error(err);
      setError("Invalid Email or Password.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName,
        role: 'company', 
        createdAt: new Date().toISOString()
      }, { merge: true });

      await checkRoleAndRedirect(user);
    } catch (err) {
      setError("Google Sign-In Failed.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="brand-title">SHNOOR LMS</h2>
          <p className="brand-subtitle">Login to Portal</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="sample@gmail.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div style={{textAlign: 'right', marginTop: '5px', fontSize: '0.85rem'}}>
               <Link to="/forgot-password" className="link">Forgot Password?</Link>
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{width: 'auto', height: 'auto'}} />
            <label htmlFor="rememberMe" style={{margin:0, fontWeight: 'normal'}}>Remember me</label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
             {loading ? "Logging in..." : <><FaSignInAlt /> Login</>}
          </button>

          <div className="divider"><span>OR</span></div>

          <button type="button" className="login-btn google-btn" onClick={handleGoogleSignIn} disabled={loading}>
             <FaGoogle style={{ color: '#EA4335', marginRight: '8px' }} /> Sign in with Google
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="link">Register Here</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Login;
