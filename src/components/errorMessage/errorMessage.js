import React from "react";
import "./errorMessage.css";
import img from "./error.png"; // kartinku napryamuyu

const ErrorMessage = () => {
  return (
    <>
      <img src={img} alt="error" />
      <span>Somethingwent wrong</span>
    </>
  );
};

export default ErrorMessage;
