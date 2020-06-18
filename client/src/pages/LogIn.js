import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.scss";

const LogIn = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(loginForm);
  };

  const { email, password } = loginForm;
  return (
    <div className="login_container">
      <section className="login_form">
        <h1>Account Login</h1>
        <form>
          <label>Email: </label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
          <input type="button" value="LogIn" onClick={() => handleSubmit()} />
        </form>
        <small>
          Not a member yet?
          <Link to="/signup" style={{ color: "#72E4CE", marginLeft: "10px" }}>
            Create An Account
          </Link>
        </small>
      </section>
    </div>
  );
};

export default LogIn;
