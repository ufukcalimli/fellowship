import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signup.scss";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(signUpForm);
  };

  const { username, email, password } = signUpForm;
  return (
    <div className="signup_container">
      <section className="signup_form">
        <h1>Create an Account</h1>
        <form>
          <label>Username: </label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(e) => handleChange(e)}
            required
          />
          <label>Email: </label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
          <label htmlFor="role">I'm a:</label>

          <select
            name="role"
            id="role"
            class="selection"
            onChange={(e) => handleChange(e)}
          >
            <option value="select"></option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <label>Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
          <input type="button" value="Sign up" onClick={() => handleSubmit()} />
        </form>
        <small>
          Already a member?
          <Link to="/login">Log in to Your Account</Link>
        </small>
      </section>
    </div>
  );
};

export default SignUp;
