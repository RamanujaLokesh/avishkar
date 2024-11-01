import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const pageStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  };

  const headerStyles = {
    maxWidth: "600px",
  };

  const titleStyles = {
    fontSize: "2.5em",
    marginBottom: "0.5em",
    color: "#333",
  };

  const paragraphStyles = {
    fontSize: "1.2em",
    color: "#555",
  };

  const buttonContainerStyles = {
    marginTop: "1.5em",
  };

  const buttonStyles = {
    padding: "0.8em 1.2em",
    margin: "0 0.5em",
    fontSize: "1em",
    textDecoration: "none",
    borderRadius: "5px",
    color: "#fff",
  };

  return (
    <div style={pageStyles}>
      <header style={headerStyles}>
        <h1 style={titleStyles}>Welcome to Our Application</h1>
        <p style={paragraphStyles}>Discover the amazing features we offer!</p>
        <div style={buttonContainerStyles}>
          <Link to="/login" style={{ ...buttonStyles, backgroundColor: "#007bff" }}>
            Login
          </Link>
          <Link to="/register" style={{ ...buttonStyles, backgroundColor: "#6c757d" }}>
            Register
          </Link>
        </div>
      </header>
    </div>
  );
}

export default MainPage;
