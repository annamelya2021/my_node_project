import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/fetch";
import { saveToken } from "../../utils/local";
import "./Register.css";

const initialRegisterState = {
  email: '',
  password: '',
  username: '',
};

const Register = () => {
    const [registerData, setRegisterData] = useState(initialRegisterState);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleRegisterChange = (e) => {
      const { name, value } = e.target;
      setRegisterData({ ...registerData, [name]: value });
    };
  
    const handleRegister = async (registerData) => {
      const res = await register(registerData);
      if (res.token) {
        saveToken(res.token);
        return false; 
      }
      setMessage('Registration failed. Please try again.');
      return true; 
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await handleRegister(registerData);
      if (success) {
        setMessage('Registration successful! Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    };
  
    return (
      <div className="register-container">
        <h2>Register</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="username"
            required
            placeholder="Username"
            value={registerData.username}
            onChange={handleRegisterChange}
          />
          <input
            type="text"
            required
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };

export default Register;
