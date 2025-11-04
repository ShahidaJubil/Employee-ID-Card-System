import axios from "axios";

export default axios.create({
  baseURL: "/api", //used for deploy on Render
  //baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});
