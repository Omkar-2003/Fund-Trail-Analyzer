import React, { useState } from "react";// Import the Login component

const HomePage = () => {
  // Your existing code for the home page

  return (
    <div>
      {/* Your existing content */}
      <Login onFormSwitch={handleFormSwitch} />
    </div>
  );
};

const RegisterPage = () => {
  // Your existing code for the register page

  return (
    <div>
      {/* Your existing content */}
      <Login onFormSwitch={handleFormSwitch} />
    </div>
  );
};

// Add other pages as needed...

const App = () => {
  const [formType, setFormType] = useState("login");

  const handleFormSwitch = (form) => {
    setFormType(form);
  };

  const renderForm = () => {
    if (formType === "login") {
      return <Login onFormSwitch={handleFormSwitch} />;
    } else if (formType === "register") {
      return <RegisterPage />;
    }
    // Add other form types if needed...
  };

  return (
    <div>
      {/* Your app layout */}
      {renderForm()}
    </div>
  );
};
