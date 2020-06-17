import React from "react";
import { Link } from "react-router-dom";

const LoginAlert = () => {
  return (
    <div>
      <h1>Yor are not Logged In</h1>
      <Link to="/login">Login To your Account</Link>
      <p>Don't have an account yet! Join the communty!</p>
      <Link to="/signup">Create a new account</Link>
    </div>
  );
};

export default LoginAlert;
