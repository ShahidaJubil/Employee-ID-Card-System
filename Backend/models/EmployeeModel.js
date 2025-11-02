const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  designation: String,
  department: String,
  contact: String,
  email: String,
  employeeCode: String,
  address: String,
  joiningDate: String,
  photo: String,
  userId: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
