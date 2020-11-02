import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPen } from "react-icons/bs";
import { TiHome, TiUser } from "react-icons/ti";
import { GoPrimitiveDot } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { user } from "../mocks";
import Logo from "../images/logo1.png";
import "../styles/header.scss";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [queryValue, setQueryValue] = useState("");

  const handleQueryChange = (e) => {
    console.log(e.target.value);
    setQueryValue(e.target.value);
  };

  return (
    <React.Fragment>
      {!user && (
        <nav
          className={
            toggleMenu
              ? "navbar navbar_main navbar_mobile"
              : "navbar navbar_main"
          }
        >
          <div>
            <Link to="/">
              <img className="logo" src={Logo} alt="site_logo" />
            </Link>
            <div className="search">
              <input
                type="text"
                value={queryValue}
                placeholder="Search..."
                onChange={(e) => handleQueryChange(e)}
              />
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
          <i
            className={
              toggleMenu
                ? "hamburger_icon hamburger_icon_animation"
                : "hamburger_icon"
            }
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <div></div>
            <div></div>
            <div></div>
          </i>
        </nav>
      )}

      {user && (
        <nav
          className={
            toggleMenu
              ? "navbar navbar_main navbar_mobile"
              : "navbar navbar_main"
          }
        >
          <div>
            <Link to="/">
              <img className="logo" src={Logo} alt="site_logo"></img>
            </Link>
            <div className="search">
              <input
                type="text"
                value={queryValue}
                placeholder="Search..."
                onChange={(e) => handleQueryChange(e)}
              />
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
          <i
            className={
              toggleMenu
                ? "hamburger_icon hamburger_icon_animation"
                : "hamburger_icon"
            }
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <div></div>
            <div></div>
            <div></div>
          </i>
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navbar;
