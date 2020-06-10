import React from "react";
import { Link } from "react-router-dom";
import { DiGithubBadge, DiGithubFull } from "react-icons/di";
import { AiFillLinkedin } from "react-icons/ai";
import "../styles/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="links__social">
        <i>
          <DiGithubBadge size="35px" />
          <DiGithubFull size="35px" />
        </i>
        <i>
          <AiFillLinkedin size="35px" />
          LinkedIn
        </i>
      </section>
      <section className="links__menu">
        <ul>
          <li>
            <Link to="/home">
              Home
              <span className="bottom_line"></span>
            </Link>
          </li>
          <li>
            <Link to="#">
              Us
              <span className="bottom_line"></span>
            </Link>
          </li>
          <li>
            <Link to="#">
              Tags
              <span className="bottom_line"></span>
            </Link>
          </li>
          <li>
            <Link to="#">
              Discussions
              <span className="bottom_line"></span>
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
