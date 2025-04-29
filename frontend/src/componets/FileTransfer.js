import React, { useState, useEffect } from "react";
import filec from "../assets/img/file001.png";
import filecsv from "../assets/img/csv.png";
import ProgressBar from "./ProgressBar";
import StatusMessage from "./StatusMessage";
import { useNavigate } from "react-router-dom";
import "./FileTransfer.css"; // Import the CSS file

const Try = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [showFlashButton, setShowFlashButton] = useState(false);
  const [timer, setTimer] = useState(15); // Initialize the timer to 5 seconds

  const navigate = useNavigate();

  const handleFlashButtonClick = () => {
    navigate("/mlpart");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setShowFlashButton(false);

    // You can auto-detect file type based on the file extension here, if needed
  };

  // Simulating the file transfer progress using useEffect
  useEffect(() => {
    let progressValue = 0;
    const progressInterval = setInterval(() => {
      progressValue += 10;
      setProgress(Math.min(progressValue, 100));

      if (progressValue >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setStatus("File transformation successful!");
          setShowFlashButton(true);
          setProgress(0);
        }, 500);
      }
    }, 500);

    // Start the 5-second timer for navigation
    setTimer(5); // Reset the timer on each transfer

    return () => clearInterval(progressInterval); // Cleanup the interval on component unmount
  }, []);

  // Use useEffect to handle the timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      navigate("/mlpart"); // Navigate to "/mlpart" after the timer reaches 0
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [timer, navigate]);

  return (
    <div
      className="file-transfer-container"
      style={{ background: "linear-gradient(to right, #ffc0cb, #87cefa)" }}
    >
      <h1>File Transformation</h1>
      {/* File icons */}
      <div className="file-icons-container">
        <img className="file" src={filec} alt="FileC" />
        <img src={filecsv} alt="Filecsv" />
      </div>
      {/* File selection */}
      <div className="file-input-container">
        {/* You can add file input here if needed */}
      </div>
      <ProgressBar progress={progress} />
      <StatusMessage status={status} />
      <div className="flash-button-container">
        {showFlashButton && (
          <div className="flash-button" onClick={handleFlashButtonClick}>
            Analysed!
          </div>
        )}
      </div>
      {/* Timer display */}
      <div className="timer-container">
        <p>{`Transforming in ${timer} seconds...`}</p>
      </div>
    </div>
  );
};

export default Try;
