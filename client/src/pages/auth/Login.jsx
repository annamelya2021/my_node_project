import React, { useState } from "react";
import { login } from "../../utils/fetch";
import { saveToken } from "../../utils/local";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const initialLoginState = {
  email: '',
  password: '',
};

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState(initialLoginState);
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (loginData) => {
    const res = await login(loginData);

    //console.log(res);
    if (res.token) {
      saveToken(res.token);
      if (res.user && res.user.roles) {
        localStorage.setItem('userRole', res.user.roles); 
        if (res.user.role === "admin") {
          setIsAdmin(true);
        }
      }
      setMessage('Logged in successfully!');
      navigate('/');
    } else {
      setMessage('Login failed. Please try again.');
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <div className="registration-link">
        <p>Don't have an account? <button onClick={() => navigate('/register')}>Register here</button></p>
      </div>
    </div>
  );
  
};

export default Login;
