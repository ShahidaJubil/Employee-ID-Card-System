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
  origin: "*", // allow all origins; adjust if needed
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// ✅ Serve uploaded images first, with CORS headers
const uploadsPath = path.join(__dirname, "uploads");
console.log("Uploads path:", uploadsPath); // Debug: check path in Render
app.use("/uploads", express.static(uploadsPath, {
  setHeaders: (res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
  },
}));

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

// ✅ Serve React frontend (build folder)
const frontendBuildPath = path.join(__dirname, "../Frontend/employee-id-frontend/build");
app.use(express.static(frontendBuildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
