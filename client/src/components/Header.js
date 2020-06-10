import React from "react";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { TiHome, TiUser } from "react-icons/ti";
import gutentag from "../images/gutentag.png";
import buenasdias from "../images/buenasdias.png";
import ciao from "../images/ciao.png";
import hello from "../images/hello.png";
import marhaba from "../images/marhaba.png";
import salut from "../images/salut.png";

import "../styles/header.scss";

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="banner">
        <h1>Welcome to the greatest language learning community!</h1>
        <div className="animated-images">
          <img className="buenasdias" src={buenasdias} alt="buenasdias" />
          <img src={ciao} alt="ciao" />
          <img src={gutentag} alt="gutentag" />
          <img src={hello} alt="hello" />
          <img src={marhaba} alt="marhaba" />
          <img src={salut} alt="salut" />
        </div>
      </div>
      <div className="navbar">
        <div>
          <i>Logo</i>
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
      </div>
    </header>
  );
};

export default Header;
