import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {TextField, Button,Box, Paper, Typography,Stack,Alert,} from "@mui/material";
import api from "../../api";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState(""); //  invalid credentials 
  const navigate = useNavigate();

  //  Email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setAlertMsg("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address." }));
    }

    if (name === "password" && value.trim().length === 0) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await api.post("/auth/login", form);

      if (res.data.message === "Invalid credentials") {
        setAlertMsg(
          "Invalid credentials. Please check your email or password."
        );
        return;
      }


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));


      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setAlertMsg("Invalid credentials. Please check your email or password.");
    }
  };

  return (
    <Box className="login-container">
      <Paper
        elevation={6}
        className="login-paper"
        sx={{ m: { xs: 1, sm: 2, md: 4 } }}
      >
        <Typography variant="h5" gutterBottom className="login-title">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {/* Email Field */}
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.email)}
              helperText={
                errors.email && (
                  <span className="error-text">{errors.email}</span>
                )
              }
            />

        
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password)}
              helperText={
                errors.password && (
                  <span className="error-text">{errors.password}</span>
                )
              }
            />

           
            {alertMsg && (
              <Alert severity="error" sx={{ fontSize: "0.9rem" }}>
                {alertMsg}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="login-button"
            >
              Login
            </Button>
          </Stack>
        </Box>

        <Typography className="signup-text" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
