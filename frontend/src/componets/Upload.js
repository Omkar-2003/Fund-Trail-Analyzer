import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css"; // Import the updated CSS
import Axios from "axios";

const Upload = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const [numericInput, setNumericInput] = useState("");

  const handleNumericChange = (event) => {
    const inputValue = event.target.value;

    // Only allow numeric input between 11 and 22 digits
    if (/^\d{0,22}$/.test(inputValue) || inputValue === "") {
      setNumericInput(inputValue);
    }
  };

  const handleUpload = () => {
    if (numericInput) {
      const numericValue = parseInt(numericInput, 10); // Parse to an integer
      // You can perform further validation logic here
      console.log("Numeric input:", numericValue);

      // Navigate to the "file" page after validation
      navigate("/file");
    } else {
      console.log("No numeric input entered.");
    }
  };

  const gradientBackgroundStyle = {
    background: "linear-gradient(to right, #d1c4e9, #b3e5fc)", // Your chosen gradient colors
    height: "100vh", // Set the background height to full viewport height
  };

  return (
    <div className="ml-conta" style={gradientBackgroundStyle}>
      <h2 className="mb-4">Upload Numeric Value</h2>
      <div className="mb-3">
        <label htmlFor="numericInput" className="form-label">
          Enter a numeric value:
        </label>
        <input
          type="text" // Use type="text" to avoid automatic conversion
          className="form-control"
          id="numericInput"
          value={numericInput}
          onChange={handleNumericChange}
        />
      </div>
      <div>{numericInput && <p>Entered Numeric Value: {numericInput}</p>}</div>
      <div className="d-flex justify-content-center">
        {" "}
        {/* Center-align the button */}
        <button className="btn btn-primary" onClick={handleUpload}>
          Validate and Upload
        </button>
      </div>
      <footer style={{ position: "absolute", left: "40%", bottom: "5%" }}>
        © 2023 @Money Trail Copyright 2023. All Rights Reserved
      </footer>
    </div>
  );
};

export default Upload;
