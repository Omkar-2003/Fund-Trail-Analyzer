import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mlpart.css';
import mlback from '../assets/img/mlback.png';

function Mlana() {
  const navigate = useNavigate();
  const [isFileUpdated, setIsFileUpdated] = useState(false);

  useEffect(() => {
    // Simulate file analysis by setting a timeout
    const timeoutId = setTimeout(() => {
      // Assume the file analysis is completed after 5 seconds (you can adjust this time as needed)
      setIsFileUpdated(true);
    }, 15000);

    // Clean up the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Check if the file analysis is completed and navigate accordingly
    if (isFileUpdated) {
      navigate('/report'); // Replace '/' with the desired destination path after file update
    }
  }, [isFileUpdated, navigate]);

  const handlePrintReport = () => {
    // Add any logic here for printing the report
    console.log('Printing the report...');
    navigate('/report'); // Replace '/print-report' with the desired destination path for printing the report
  };

  return (
    <div className='ml-conta' style={{background: "linear-gradient(to right, #ffc0cb, #87cefa)"}}>
      <p className='ml-text'>
        "Our model is analyzing and may take some time to complete.
        <br></br> We will  you generate your report as soon as it is finished."
      </p>

      <div className="centered-image">
        <img src={mlback} alt="Image 1" />
      </div>
    
      <br></br>
      {/* <button className='ml-button' onClick={handlePrintReport}>
        PRINT REPORT
      </button> */}
    </div>
  );
}

export default Mlana;
