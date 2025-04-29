import React, { useState, useEffect } from "react";

const ReportHistory = () => {
  const [htmlFiles, setHtmlFiles] = useState([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHtmlFiles() {
      try {
        const response = await fetch("http://localhost:4000/api/htmlfiles");

        if (!response.ok) {
          throw new Error("Response not OK");
        }
        const data = await response.json();
        setHtmlFiles(data.htmlFiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching HTML files:", error);
        setError("Error fetching HTML files: " + error.message);
        setLoading(false);
      }
    }

    fetchHtmlFiles();
  }, []);

  const handleFileClick = (index) => {
    setSelectedFileIndex(index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={styles.reportHistoryContainer}>
      <h2>Report History</h2>
      <ul style={styles.fileList}>
        {htmlFiles.map((fileName, index) => (
          <li
            key={index}
            style={styles.fileItem}
            onClick={() => handleFileClick(index)}
          >
            {fileName}
          </li>
        ))}
      </ul>

      {selectedFileIndex !== null && (
        <div style={styles.iframeOverlay}>
          <div
            style={styles.closeButton}
            onClick={() => setSelectedFileIndex(null)}
          >
            X
          </div>

          <iframe
            title={`HTML File ${selectedFileIndex + 1}`}
            src={`${htmlFiles[selectedFileIndex]}`}
            style={styles.fullScreenIframe}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  reportHistoryContainer: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    border: "1px solid #ccc",
    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(to right, #ffc0cb, #ff9e7a, #87cefa)",
    minHeight: "100vh", // Set the minimum height to cover the whole screen
  },
  fileList: {
    listStyleType: "none",
    padding: "0",
    margin: "0",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  fileItem: {
    padding: "10px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "4px",
    flexGrow: 1,
    minWidth: "150px",
    textAlign: "center",
    background: "#f0f0f0",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },

  iframeOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  fullScreenIframe: {
    border: "none",
    width: "80%",
    height: "80%",
    background: "#f0f0f0",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    background: "red",
  },
};

export default ReportHistory;
