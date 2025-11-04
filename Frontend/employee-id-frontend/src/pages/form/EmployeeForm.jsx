import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Navbar from '../../components/navbar/Navbar';
import './EmployeeForm.css';
import { MdUpload } from "react-icons/md";

export default function EmployeeForm() {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    department: '',
    employeeCode: '',
    contact: '',
    email: '',
    address: '',
    joiningDate: '',
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // --- Validation logic ---
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (!/^[a-zA-Z\s]+$/.test(value))
          return 'Name can contain only letters';
        return '';
      case 'designation':
        return !value.trim() ? 'Designation is required' : '';
      case 'department':
        return !value.trim() ? 'Department is required' : '';
      case 'employeeCode':
        return !value.trim() ? 'Employee ID is required' : '';
      case 'contact':
        if (!value.trim()) return 'Contact number is required';
        if (!/^\d{10}$/.test(value))
          return 'Contact must be a 10-digit number';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return 'Invalid email format';
        return '';
      case 'joiningDate':
        if (!value) return 'Joining date is required';
        if (new Date(value) > new Date())
          return 'Joining date cannot be in the future';
        return '';
      default:
        return '';
    }
  };

  // --- Handle changes + real-time validation + unique ID check ---
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    const fieldValue = name === 'photo' ? files[0] : value;

    // Update form state
    setForm((prev) => ({ ...prev, [name]: fieldValue }));

    // Validate field instantly
    const errorMsg = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    // Real-time Employee ID uniqueness check
    if (name === 'employeeCode' && fieldValue.trim()) {
      try {
        const res = await api.get(`/employees/check-id/${fieldValue}`);
        if (res.data.exists) {
          setErrors((prev) => ({
            ...prev,
            employeeCode: 'Employee ID already exists',
          }));
        }
      } catch (err) {
        console.error('Error checking Employee ID uniqueness:', err);
      }
    }
  };

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      // Skip address validation
      if (key !== 'address') {
        const msg = validateField(key, value);
        if (msg) tempErrors[key] = msg;
      }
    });

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      formData.append('userId', user._id);

      await api.post('/employees', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Employee added successfully!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error === "Employee ID already exists") {
        setErrors((prev) => ({
          ...prev,
          employeeCode: "Employee ID already exists",
        }));
      } else {
        alert('Error adding employee');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Box className="form-container">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: 450,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: 'primary.dark' }}>
            Add Employee
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name *"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Designation *"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                fullWidth
                error={!!errors.designation}
                helperText={errors.designation}
              />
              <TextField
                label="Department *"
                name="department"
                value={form.department}
                onChange={handleChange}
                fullWidth
                error={!!errors.department}
                helperText={errors.department}
              />
              <TextField
                label="Employee ID *"
                name="employeeCode"
                value={form.employeeCode}
                onChange={handleChange}
                fullWidth
                error={!!errors.employeeCode}
                helperText={errors.employeeCode}
              />
              <TextField
                label="Contact Number *"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                fullWidth
                error={!!errors.contact}
                helperText={errors.contact}
              />
              <TextField
                label="Email *"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Joining Date *"
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.joiningDate}
                helperText={errors.joiningDate}
              />

              <Button
                variant="outlined"
                component="label"
                sx={{
                  textTransform: 'none',
                  borderColor: '#ccc',
                  color: 'text.secondary',
                  justifyContent: 'flex-start',
                }}
              >
                {form.photo ? form.photo.name : 'Upload Photo'}
                &nbsp;&nbsp; <MdUpload size={18} color="#1b3b5b" />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  hidden
                  onChange={handleChange}
                />
              </Button>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: 'rgb(17, 17, 85)',
                  '&:hover': { bgcolor: '#115293' },
                }}
              >
                Add Employee
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
