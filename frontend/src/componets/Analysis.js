import React, { useState } from 'react';
import fileicon from '../assets/img/fileupd.png';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Analysis() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    // const file = event.dataTransfer.files[0];
    // Handle the dropped file logic here
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setIsUploading(true);

    // Read the file data using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;

      setIsUploading(false);
      event.target.value = '';

      // Navigate to the FileTransfer page after uploading the file
      handleClick('/FileTransfer');

      // Log that the file has been chosen and is being uploaded
      console.log('File has been chosen and is being uploaded.');

      // Get the file extension from the file's name
      const fileExtension = file.name.split('.').pop().toLowerCase();

      // Make a POST request to your API to upload the file
      var apiUrl = `http://127.0.0.1:5000/`; // Replace this with your API endpoint for generic file upload
      let formData = new FormData();
      formData.append('file', file);

      // Conditionally set the API endpoint based on the file extension
      if (fileExtension === 'pdf') {
        apiUrl = 'http://127.0.0.1:5000/pdf-to-csv';
        // eslint-disable-next-line no-restricted-globals
        console.log('File is a pdf');
      } else if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
        apiUrl = 'http://127.0.0.1:5000/image-to-csv';
        // eslint-disable-next-line no-restricted-globals
        console.log('File is an image');

        // Add more conditions for other file types if needed
      }

      Axios.post(apiUrl, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    reader.readAsDataURL(file); // Read file data as a data URL
    setTimeout(() => {
      setIsUploading(false);
      event.target.value = '';
      handleClick('/FileTransfer');
    }, 3000);
  };

  const gradientBackgroundStyle = {
    background: 'linear-gradient(to right, #d1c4e9, #b3e5fc)', // Your chosen gradient colors
  };

  const loadingAnimationStyle = {
    background: '#f0f0f0',
    display: isUploading ? 'block' : 'none',
  };

  const hideLoadingAnimation = () => {
    setIsUploading(false);
  };

  if (isUploading) {
    // Set a 2-second delay before hiding the loading animation
    setTimeout(hideLoadingAnimation, 2000);
  }

  return (
    <div className="fileupload-container" style={gradientBackgroundStyle}>
      <div className="fileupload-bg">
        <h1 className="fileupload-heading">FILE UPLOADATION</h1>
        <div
          className={`droparea border ${isDragOver ? 'bg-gray-200' : 'bg-white'}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="loading-container" style={loadingAnimationStyle}>
              <div className="loading-animation"></div>
              <p className="uploading-text">Uploading...</p>
            </div>
          ) : (
            <>
              <label htmlFor="fileInput" className="fileinput-label">
                <img src={fileicon} alt="Fileicon" className="fileicon" />
              </label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                style={{ opacity: '0', border: 'none' }}
              />
              <p className="fileupload-text">DROP YOUR FILE HERE</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
