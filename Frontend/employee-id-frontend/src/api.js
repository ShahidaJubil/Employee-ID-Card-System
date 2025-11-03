// import axios from "axios";
// export default axios.create({
//   baseURL: "http://localhost:5000/api",
// });

import axios from "axios";

export default axios.create({
  baseURL: "/api", // ✅ relative path works both locally and on Render
  headers: { "Content-Type": "application/json" },
});
