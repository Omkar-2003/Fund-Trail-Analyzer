import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mlpart.css";
import mlback from "../assets/img/mlback.png";

function TrailPage() {
  const navigate = useNavigate();
  const [isFileUpdated, setIsFileUpdated] = useState(false);

  useEffect(() => {
    // Simulate file analysis by setting a timeout
    const timeoutId = setTimeout(() => {
      // Assume the file analysis is completed after 8 seconds (you can adjust this time as needed)
      setIsFileUpdated(true);
    }, 8000);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Check if the file analysis is completed and navigate accordingly
    if (isFileUpdated) {
      navigate("/trailhistory"); // Replace '/trail-report' with the desired destination path after file update
    }
  }, [isFileUpdated, navigate]);

  const handlePrintTrailReport = () => {
    // Add any logic here for printing the trail report
    console.log("Printing the trail report...");
    navigate("/trailhistory"); // Replace '/print-trail-report' with the desired destination path for printing the trail report
  };

  return (
    <div
      className="ml-conta"
      style={{ background: "linear-gradient(to right, #ffc0cb, #87cefa)" }}
    >
      <p className="ml-text">
        "Our trail analysis is in progress and may take a moment to complete.
        <br></br>We will provide you with the trail report as soon as it's
        ready."
      </p>

      <div className="centered-image">
        <img src={mlback} alt="Trail Image" />
      </div>

      <br></br>
      <button className="ml-button" onClick={handlePrintTrailReport}>
        REPORT
      </button>
    </div>
  );
}

export default TrailPage;
