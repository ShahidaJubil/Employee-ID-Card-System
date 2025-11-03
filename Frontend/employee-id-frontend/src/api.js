// import axios from "axios";
// export default axios.create({
//   baseURL: "http://localhost:5000/api",
// });

import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:5000/api",   // use IPv4 loopback
  headers: { "Content-Type": "application/json" },
});
