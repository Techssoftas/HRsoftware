import React from "react";

export default function Footer() {
  return (
    <>
      <div
        className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3"
        style={{
          width: "100%",
          position: "fixed", // stays in place
          bottom: 0,          // sticks to bottom
          left: 0,
          zIndex: 1000,       // stays above other content
          margin: 0,
          boxShadow: "0 -1px 4px rgba(0,0,0,0.1)",
          height:'46px',
          background: "linear-gradient(180deg, #4B749F 0%, #243748 100%)" 
        }}
      >
  <p className="mb-0" style={{ color: "#D8DFEE",background: '#ffffff1a' }}>

          2025 &copy; Techssoftinnovations. All Rights Reserved
        </p>
        <p className="mb-0" style={{ color: "#D8DFEE",background: '#ffffff1a' }}>
          Designed &amp; Developed by{" "}
          <a href="https://techssoftinnovations.com/" className="text-primary fw-bold" >
  Techssoftinnovations
</a>
{" | "}
<a href="tel:+919962976444" className="text-primary fw-bold">
  +91 9962976444
</a>

        </p>
      </div>
    </>
  );
}
