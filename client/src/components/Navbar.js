import React from "react";
import { Link, useHistory } from "react-router-dom";
import { BsPen } from "react-icons/bs";
import { TiHome, TiUser } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { user } from "../mocks";
import Logo from "../images/logo1.png";
import "../styles/header.scss";

const Navbar = () => {
  let history = useHistory();
  function redirect() {
    return history.push("/");
  }

  return (
    <React.Fragment>
      {!user && (
        <nav className="navbar navbar_main">
          <div>
            <Link to="/">
              <img className="logo" src={Logo} alt="site_logo" />
            </Link>
            <div className="search">
              <input type="text" />
            </div>
          </div>
          <ul>
            <li>
              <TiHome size="1.5em" fill="white" />

              <Link to="/">Home</Link>
            </li>
            <span>
              <GoPrimitiveDot />
            </span>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <span>
              <GoPrimitiveDot />
            </span>
            <li>
              <TiUser size="1.5em" fill="white" />
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
      )}

      {user && (
        <nav className="navbar navbar_main">
          <div>
            <img className="logo" src={Logo} alt="site_logo"></img>
            <div className="search">
              <input type="text" />
            </div>
          </div>
          <ul>
            <li>
              <TiHome size="1.5em" fill="white" />

              <Link to="/">Home</Link>
            </li>
            <span>
              <GoPrimitiveDot />
            </span>
            <li>
              <BsPen size="1.5em" fill="white" />

              <Link to="/create_post">Write A post</Link>
            </li>
            <span>
              <GoPrimitiveDot />
            </span>
            <li>
              <TiUser size="1.5em" fill="white" />
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <span>
              <GoPrimitiveDot />
            </span>
            <li>
              <RiLogoutBoxRLine size="1.5em" fill="white" />
              <Link to="/dashboard">Logout</Link>
            </li>
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navbar;
