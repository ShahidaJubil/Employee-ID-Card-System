import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Paper, Typography, Stack } from '@mui/material';
import api from '../../api';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await api.post('/auth/signup', form); 

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
    <Box className="signup-container" >
      <Paper elevation={6} className="signup-paper"  sx={{
    m: { xs: 1, sm: 2, md: 4 }
  }}>
        <Typography variant="h5" gutterBottom className="signup-title">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} >
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="name"
              type="text"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="contained" fullWidth className="signup-button">
              Sign Up
            </Button>
          </Stack>
        </Box>
    <br />
        <Typography className="login-link-text">
          Already have an account?{' '}
          
          <Link to="/login" className="login-link">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
