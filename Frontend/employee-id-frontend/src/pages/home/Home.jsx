import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import api from '../../api';
import Navbar from '../../components/navbar/Navbar';
import EmployeeDetails from '../employeeDetails/EmployeeDetails';

export default function Home() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }


    api.get(`/employees/${user._id}`)
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
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
        <ul className="employee-list">
          {employees.length > 0 ? (
            employees.map(emp => (
              <li
                key={emp._id}
                className="employee-line-item"
                onClick={() => handleEmployeeClick(emp)}
              >
                <span><strong>{emp.name}</strong></span> | 
                <span>{emp.designation}</span> | 
                <span>ID: {emp.employeeCode}</span> | 
                <span>Dept: {emp.department}</span>
              </li>
            ))
          ) : (
            <p>No employees found.</p>
          )}
        </ul>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <EmployeeDetails emp={selectedEmployee} closeDetails={closeDetails} />
      )}
    </div>
  );
}
