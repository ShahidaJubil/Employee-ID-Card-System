import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import api from '../../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle signup 
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Signup button clicked, sending request...");

    try {
      const res = await api.post('/auth/signup', form); 

      console.log("Signup response:", res.data);

      if (res.data.message === 'User already exists') {
        alert('User already exists, please login instead.');
      } else {
        alert('Signup successful! Please login.');
        navigate('/login');
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert('Error during signup');
    }
  };

  
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          className="input-field"
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="input-field"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Sign Up
        </button>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
