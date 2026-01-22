import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase'; 
import './Login.css'; 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for password reset instructions.');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="brand-title">SHNOOR LMS</h2>
          <p className="brand-subtitle">Reset Password</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {message && (
          <div style={{
            backgroundColor: '#dcfce7', 
            color: '#166534', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '15px', 
            textAlign: 'center',
            border: '1px solid #bbf7d0'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleReset} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your registered email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="login-footer">
          <p>Remembered your password? <Link to="/" className="link">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;