import React, { useRef, useEffect, useState } from "react";

function Contact() {
  const inputRef = useRef();
  const [showContainer, setShowContainer] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
    setShowContainer(true);
  }, []);

  const backgroundContainerStyle = {
    position: "absolute",
    top: "0%",
    left: 0,
    width: "100%",
    height: "100%",
    // background: 'linear-gradient(to right, #f5f5f5, #f5f5f5)', // Linear gradient background
    background: "linear-gradient(to right, #ffc0cb, #87cefa)",
    zIndex: -1, // Set a negative z-index to put it behind the main content
  };
  const containerStyle = {
    width: "50%",
    height: "75vh",
    // margin: 'auto',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "linear-gradient(to left, #ffc0cb, #87cefa)",
    position: "relative",
    top: "10px",
    left: showContainer ? "0" : "0px", // Set the right position based on the state
    borderRadius: "25px",
    transition: "left 3s ease", // Add transition for smooth animation
  };

  const labelStyle = {
    padding: "10px",
    margin: "20px 0",
    fontSize: "14px",
    color: "black", // Set the text color to white
    fontWeight: "bold", // Make the text bold
    // textShadow: '1px 1px 0 black' // Add the black stroke effect using text-shadow
  };
  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    height: "40px",
    padding: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const textareaStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    height: "120px",
    padding: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    resize: "vertical",
  };

  const buttonStyle = {
    backgroundColor: "skyblue",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
    bottom: "25px",
  };

  const headingStyle = {
    fontSize: "25px",
    margin: "40px 0px",
    padding: "0 80px",
    position: "absolute",
    top: "-5%",
    left: "30%",
    color: "#000", // Set heading text color to white
  };

  const separatorStyle = {
    borderBottom: "1px solid #ccc",
    position: "absolute",
    top: "10%",
    width: "100%",
  };

  const iframeStyle = {
    width: "45%",
    height: "75vh",
    borderRadius: "25px",
    position: "absolute",
    bottom: "94px",
    right: "-330px",
    transform: "translateX(-50%)", // Center the iframe horizontally
    transition: "left 3s ease", // Add transition for smooth animation
    zIndex: 0, // Set a lower z-index to put it behind the container
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic here to handle the form submission, e.g., sending data to the server
  };

  return (
    <div>
      <div style={backgroundContainerStyle}></div>
      <div style={containerStyle}>
        <p style={headingStyle}>Contact Us</p>
        <div style={separatorStyle}></div>
        <div style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                marginTop: "90px",
                color: "black",
              }}
            >
              <label style={labelStyle}>
                First Name
                <input ref={inputRef} type="text" style={inputStyle} />
              </label>
              <label style={{ ...labelStyle, paddingLeft: "20px" }}>
                Last Name
                <input type="text" style={inputStyle} />
              </label>
            </div>
            <label style={labelStyle}>
              Email
              <input type="email" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Message
              <input type="text" style={inputStyle} />
            </label>
            <label style={labelStyle}>Additional Details</label>
            <textarea style={textareaStyle} name="additional" />
            <button type="submit" style={buttonStyle}>
              Send Message
            </button>
          </form>
        </div>
      </div>
      <iframe
        src="/assets/fry.html" // Replace with the URL of the website you want to display in the iframe
        style={iframeStyle}
        title="External Content"
      />
    </div>
  );
}

export default Contact;
