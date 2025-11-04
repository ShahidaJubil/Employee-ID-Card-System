import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import api from "../../api";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setSuccess("");
  };

  //  Instant validation for all fields (email included)
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    let message = "";

    if (name === "email") {
      // Check email format first
      if (!validateEmail(value)) {
        message = "Please enter a valid email address.";
      } else {
        // Ping backend signup to see if it returns "User already exists"
        try {
          await api.post("/auth/signup", {
            email: value,
            password: "Temp1234", // dummy valid password
            confirmPassword: "Temp1234",
          });
        } catch (err) {
          if (err.response?.data?.message === "User already exists") {
            message = "Email already exists. Please login instead.";
          }
        }
      }
    }

    if (name === "password" && !validatePassword(value)) {
      message =
        "Password must be at least 8 characters long and include both letters and numbers.";
    }

    if (name === "confirmPassword" && value !== form.password) {
      message = "Passwords do not match.";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validateEmail(form.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    if (!validatePassword(form.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include both letters and numbers.",
      }));
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    try {
      const res = await api.post("/auth/signup", form);

      if (res.data.message === "User already exists") {
        setErrors((prev) => ({
          ...prev,
          email: "Email already exists. Please login instead.",
        }));
        return;
      }

      if (res.data.message === "Signup successful" || res.status === 201) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setErrors((prev) => ({
        ...prev,
        email: "Something went wrong. Please try again later.",
      }));
    }
  };

  return (
    <Box className="signup-container">
      <Paper elevation={6} className="signup-paper" sx={{ m: { xs: 1, sm: 2, md: 4 } }}>
        <Typography variant="h5" gutterBottom className="signup-title">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} mt={2}>
            {/* Email Field */}
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              // required
              error={Boolean(errors.email)}
              helperText={
                errors.email && (
                  <span className="error-text">{errors.email}</span>
                )
              }
            />

            {/* Password Field */}
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              // required
              error={Boolean(errors.password)}
              helperText={
                errors.password && (
                  <span className="error-text">{errors.password}</span>
                )
              }
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              // required
              error={Boolean(errors.confirmPassword)}
              helperText={
                errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )
              }
            />

            {success && (
              <Typography sx={{ color: "green", fontSize: "0.9rem" }}>
                {success}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth className="signup-button">
              Sign Up
            </Button>
          </Stack>
        </Box>
<br />
        <Typography className="login-link-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
