// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   TextField,
//   Button,
//   Box,
//   Paper,
//   Typography,
//   Stack
// } from '@mui/material';
// import api from '../../api';
// import './Login.css';

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login attempt:", form);

//     try {
//       const res = await api.post('/auth/login', form);
//       console.log("Login response:", res.data);

//       if (res.data.message === 'Invalid credentials') {
//         alert('Invalid credentials, please check your email or password.');
//         return;
//       }

//       // Save token and user info
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       // Directly navigate to home page
//       navigate('/home');

//     } catch (err) {
//       console.error("Login error:", err);
//       alert('Error during login. Please try again.');
//     }
//   };

//   return (
//     <Box className="login-container">
//       <Paper
//         elevation={6}
//         className="login-paper"
//         sx={{ m: { xs: 1, sm: 2, md: 4 } }}
//       >
//         <Typography variant="h5" gutterBottom className="login-title">
//           Login
//         </Typography>
//         <br />
//         <Box component="form" onSubmit={handleSubmit}>
//           <Stack spacing={2}>
//             <TextField
//               label="Email"
//               name="email"
//               type="email"
//               fullWidth
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <TextField
//               label="Password"
//               name="password"
//               type="password"
//               fullWidth
//               value={form.password}
//               onChange={handleChange}
//               required
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               className="login-button"
//             >
//               Login
//             </Button>
//           </Stack>
//         </Box>
//         <br />
//         <Typography className="signup-text">
//           Don't have an account?{' '}
//           <Link to="/signup" className="signup-link">
//             Sign up
//           </Link>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Box, Paper, Typography, Stack } from "@mui/material";
import api from "../../api";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      if (res.data.message === "Invalid credentials") {
        alert("Invalid credentials, please check your email or password.");
        return;
      }

      // Save token and user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate to home immediately
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      alert("Error during login. Please try again.");
    }
  };

  return (
    <Box className="login-container">
      <Paper elevation={6} className="login-paper" sx={{ m: { xs: 1, sm: 2, md: 4 } }}>
        <Typography variant="h5" gutterBottom className="login-title">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
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
            <Button type="submit" variant="contained" fullWidth className="login-button">
              Login
            </Button>
          </Stack>
        </Box>
        <Typography className="signup-text" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
