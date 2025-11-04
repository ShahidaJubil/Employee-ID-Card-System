import { useRef } from "react";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import "../../index.css";
import { IoMdDownload } from "react-icons/io";
import "./IdCard.css";
import defaultImage from '../../assets/profile-pic.jpg';


export default function IdCard({ emp }) {
  const cardRef = useRef();

  const downloadPDF = async () => {
    try {
      const node = cardRef.current;
      const img = node.querySelector("img");
      if (img && !img.complete) await new Promise(resolve => (img.onload = resolve));

      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 4,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgElement = new Image();
      imgElement.src = dataUrl;
      await new Promise(resolve => (imgElement.onload = resolve));

      const imgHeight = (imgElement.height * (pdfWidth - 30)) / imgElement.width;
      pdf.addImage(dataUrl, "PNG", 15, 15, pdfWidth - 30, imgHeight);
      pdf.save("Employee_ID.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (!emp) return null;

  return (
    <div className="id-card-container">
      <div ref={cardRef} className="id-card">
        <div className="id-card-header">
          <div className="id-card-photo">
            <img
              // src={
              //   emp.photo
              //     ? `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/uploads/${emp.photo}`
              //     : defaultImage
              // }
              // src={emp.photo ? `/uploads/${emp.photo}`|| "http://localhost:5000" : defaultImage}
                src={emp.photo ? `/uploads/${emp.photo}` : defaultImage}
              alt="Profile"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        <div className="id-card-info">
          <h2>
            {emp.name?.split(" ")[0]} <span>{emp.name?.split(" ")[1] || ""}</span>
          </h2>
          <p>{emp.designation}</p>

          <div className="id-card-details">
            <p><strong>Joining Date:</strong> {emp.joiningDate || "MM/DD/YYYY"}</p>
            <p><strong>Mail:</strong> {emp.email}</p>
            <p><strong>Phone:</strong> {emp.contact}</p>
            <p><strong>EMP ID:</strong> {emp.employeeCode}</p>
          </div>
        </div>

        <div className="id-card-bottom"></div>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF &nbsp;<IoMdDownload />
      </button>
    </div>
  );
}
