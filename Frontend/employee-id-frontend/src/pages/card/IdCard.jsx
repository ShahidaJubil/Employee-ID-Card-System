import { useRef } from "react";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image"; 
import "../../index.css";
import { IoMdDownload } from "react-icons/io";

export default function IdCard({ emp }) {

  console.log("Emp details: ",emp)

  const cardRef = useRef();

  const downloadPDF = async () => {
    try {
      const node = cardRef.current;

      const img = node.querySelector("img");
      if (img && !img.complete) {
        await new Promise((resolve) => (img.onload = resolve));
      }

      // convert html to quality img
      const dataUrl = await htmlToImage.toPng(node, {
        quality: 1,
        pixelRatio: 4, 
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      // Create pdf
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgElement = new Image();
      imgElement.src = dataUrl;
      await new Promise((resolve) => (imgElement.onload = resolve));

      const imgHeight = (imgElement.height * (pdfWidth - 30)) / imgElement.width;
      pdf.addImage(dataUrl, "PNG", 15, 15, pdfWidth - 30, imgHeight);
      pdf.save("Employee_ID.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (!emp) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={cardRef}
        style={{
          width: "300px",
          height: "450px",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          position: "relative",
          fontFamily: "Poppins, Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* curved blue area*/}
        <div
          style={{
            width: "100%",
            height: "120px",
            background: "linear-gradient(135deg, #0a2d61ff, #599fe5ff)",
            clipPath: "ellipse(85% 100% at 50% 0%)",
            position: "relative",
            zIndex: 1,
          }}
        ></div>

        {/* id- photo */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#fff",
            padding: "4px",
            zIndex: 2,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src={
              emp.photo
                ? `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/uploads/${emp.photo}`
                : "/default-avatar.png"
            }
            alt="Profile"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            crossOrigin="anonymous"
          />
        </div>

        {/* Info Section */}
        <div
          style={{
            marginTop: "90px",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "10px 0 0 0", fontSize: "20px", color: "#0d47a1" }}>
            {emp.name?.split(" ")[0]}{" "}
            <span style={{ color: "#0d47a1", fontWeight: "600" }}>
              {emp.name?.split(" ")[1] || ""}
            </span>
          </h2>
          <p style={{ margin: "5px 0 10px 0", color: "#777" }}>
            {emp.designation}
          </p>

          <div
            style={{
              textAlign: "left",
              fontSize: "14px",
              lineHeight: "1.7",
              marginTop: "10px",
            }}
          >
            <p>
              <strong>Joining Date:</strong> {emp.joiningDate || "MM/DD/YYYY"}
            </p>
            <p>
              <strong>Mail:</strong> {emp.email}
            </p>
            <p>
              <strong>Phone:</strong> {emp.contact}
            </p>
            <p>
              <strong>EMP ID:</strong> {emp.employeeCode}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "28px",
            background: "#0b397dff",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        ></div>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#0d47a1",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Download PDF &nbsp;<IoMdDownload />
      </button>
    </div>
  );
}
