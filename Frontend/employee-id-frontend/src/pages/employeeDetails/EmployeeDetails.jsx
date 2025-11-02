import './EmployeeDetails.css';
import IdCard from '../card/IdCard';

export default function EmployeeDetails({ emp, closeDetails }) {
  return (
    <div className="details-overlay">
      <div className="details-modal">
        <button className="close-btn" onClick={closeDetails}>X</button>
        <div className="details-content">
          {/* Left - emp info */}
          <div className="employee-info">
            <h2>{emp.name}</h2>
            <p><strong>Designation:</strong> {emp.designation}</p>
            <p><strong>Department:</strong> {emp.department}</p>
            <p><strong>Employee ID:</strong> {emp.employeeCode}</p>
            <p><strong>Contact:</strong> {emp.contact}</p>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Date of joining:</strong> {emp.joiningDate}</p>
            <p><strong>Address:</strong> {emp.address}</p>
          </div>

          {/* Right - ID card */}
          <div className="employee-idcard">
            <IdCard emp={emp} />
          </div>
        </div>
      </div>
    </div>
  );
}
