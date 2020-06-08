import React from "react";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import "../styles/header.scss";

export const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="banner">
        <h1>Welcome to the greatest language learning community!</h1>
        <div className="animated-images">
          This div will contain animated images
        </div>
      </div>
      <div className="navbar">
        <div>
          <i>Logo</i>
        </div>
        <ul>
          <li>
            <Link to="/">
              <AiFillHome size="35px" />
              Home
            </Link>
          </li>
          <span>
            <GoPrimitiveDot />
          </span>
          <li>
            <Link to="/">Sign Up</Link>
          </li>
          <span>
            <GoPrimitiveDot />
          </span>
          <li>
            <Link to="/">
              <FaRegUser size="25px" fill="white" />
              Log In
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
