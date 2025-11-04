const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  department: String,
  contact: String,
  email: String,
  employeeCode: {
    type: String,
    required: true,
    unique: true, // ✅ ensures unique value in DB
  },
  address: String,
  joiningDate: String,
  photo: String,
  userId: String,
});

// Create a unique index for employeeCode
employeeSchema.index({ employeeCode: 1 }, { unique: true });

module.exports = mongoose.model("Employee", employeeSchema);
