import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import api from "../../api";
import Navbar from "../../components/navbar/Navbar";
import EmployeeDetails from "../employeeDetails/EmployeeDetails";

export default function Home() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    api
      .get(`/employees/${user._id}`)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleEmployeeClick = (emp) => {
    setSelectedEmployee(emp);
  };

  const closeDetails = () => {
    setSelectedEmployee(null);
  };

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h2>Employees</h2>

        {employees.length > 0 ? (
          <div className="employee-table-wrapper">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleEmployeeClick(emp)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <EmployeeDetails emp={selectedEmployee} closeDetails={closeDetails} />
      )}
    </div>
  );
}
