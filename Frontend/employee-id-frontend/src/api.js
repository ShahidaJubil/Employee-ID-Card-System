
import axios from "axios";


export default axios.create({
  //baseURL: "http://127.0.0.1:5000/api",   //local
   baseURL: "/api", //used for deploy on Render
   //baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});
