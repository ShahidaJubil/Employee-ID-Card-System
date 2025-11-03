const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "*", // allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "../Frontend/employee-id-frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/employee-id-frontend/build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
