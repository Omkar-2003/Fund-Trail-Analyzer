import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import imfrt1 from '../assets/img/logomain.png'

import InputControl from "./InputControl";
import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "700px", // Adjusted container size
    background: `linear-gradient(to right, #ffc0cb, #ff9e7a, #87cefa), url(${imfrt1}) center/cover no-repeat`,
    // animation: "flagMotion 8s infinite linear",
  };

  const innerBoxStyle = {
    background: "linear-gradient(to left, #ffc0cb, #87cefa)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "380px", // Adjust the maxWidth to your preferred size
    textAlign: "center",
    margin: "auto", // Center horizontally
    height: '400px',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // animation: "flagMotion 8s infinite linear",
  };

  const headingStyle = {
    margin: "0 0 20px",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    position: "relative",
    bottom: "220px",
  };

  const logoStyle = {
    maxWidth: "100%",
    marginBottom: "20px",
    opacity: 0.2, // Decreased opacity
    position: "relative",
    bottom: "-150px", // Adjust the position as needed
  };
  const buttonStyle = {
    marginTop: "20px",
    backgroundColor: submitButtonDisabled ? "#ccc" : "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: submitButtonDisabled ? "default" : "pointer",
    position: "relative",
    top: "-160px",
  };

  const feedbackStyle = {
    color: "red",
    margin: "10px 0",
  };

  return (
    <div style={containerStyle}>
      <div style={innerBoxStyle}>
        <img src={imfrt1} alt="Logo" style={logoStyle} />

        <h1 style={headingStyle}>Signup</h1>

        <div style={{ position: "relative", bottom: "160px", opacity: "0.7" }}>
          <InputControl
            label="Name" // Added label for the Name field
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value })) // Fixed the event handling for the Name field
            }
            placeholder="Enter your name" // Added placeholder for the Name field
            type="text" // Changed the type to "text" for the Name field
          />
          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter your email"
            type="email"
          />
          <InputControl
            label="Password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter your password"
            type="password"
          />
        </div>

        {errorMsg && <p style={feedbackStyle}>{errorMsg}</p>}
        <button
          style={buttonStyle}
          disabled={submitButtonDisabled}
          onClick={handleSubmission}
        >
          {submitButtonDisabled ? "Signing up..." : "Signup"}
        </button>

        <p style={{ position: "relative", top: "-140px" }}>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
