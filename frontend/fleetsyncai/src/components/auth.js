import React, { useState } from 'react';
import './styles/auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      <h1>Welcome to Acme</h1>
      <p>Please sign in to your account or create a new one.</p>
      <div className="form-tabs">
        <button className={`tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
      </div>
      {isLogin ? (
        <div className="form-container">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="m@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" />
            <button className="forgot-password">Forgot password?</button>
          </div>
          <button className="sign-in-btn">Sign in</button>
        </div>
      ) : (
        <div className="form-container">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="m@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
          <button className="sign-in-btn">Create account</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
