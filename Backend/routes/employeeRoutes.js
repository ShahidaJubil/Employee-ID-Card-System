const express = require("express");
const Employee = require("../models/EmployeeModel");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// POST route - image upload
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const employeeData = {
      ...req.body,
      photo: req.file ? req.file.filename : null, // store filename in DB
    };

    const emp = await Employee.create(employeeData);
    res.json(emp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding employee" });
  }
});
// ✅ Check if Employee ID already exists
router.get("/check-id/:employeeCode", async (req, res) => {
  try {
    const existingEmp = await Employee.findOne({
      employeeCode: req.params.employeeCode,
    });
    res.json({ exists: !!existingEmp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error checking Employee ID" });
  }
});

// GET employees by userId
router.get("/:userId", async (req, res) => {
  try {
    const list = await Employee.find({ userId: req.params.userId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

module.exports = router;
