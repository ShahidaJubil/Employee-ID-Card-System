// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/signup/Signup";
// import Login from "./pages/login/Login";
// import Home from "./pages/home/Home";
// import EmployeeForm from "./pages/form/EmployeeForm";
// import IdCard from "./pages/card/IdCard";

// function App() {
//   const isAuthenticated = !!localStorage.getItem("user");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
//         />

//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/home"
//           element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
//         />
//         <Route
//           path="/register"
//           element={
//             isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />
//           }
//         />
//         <Route
//           path="/idcard"
//           element={isAuthenticated ? <IdCard /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import EmployeeForm from "./pages/form/EmployeeForm";
import IdCard from "./pages/card/IdCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<EmployeeForm />} />
        <Route path="/idcard" element={<IdCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

