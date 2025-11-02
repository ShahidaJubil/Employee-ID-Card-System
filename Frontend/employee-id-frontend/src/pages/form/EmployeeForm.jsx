import { useState } from 'react';
import {TextField,Button,Box,Paper,Typography,Stack,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Navbar from '../../components/navbar/Navbar';
import './EmployeeForm.css';

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

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('Logged-in User:', user);


      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      formData.append('userId', user._id);

      await api.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Employee added successfully!');
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Error adding employee');
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
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Designation"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Employee ID"
                name="employeeCode"
                value={form.employeeCode}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Contact Number"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Joining Date"
                name="joiningDate"
                type="date"
                value={form.joiningDate}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
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
