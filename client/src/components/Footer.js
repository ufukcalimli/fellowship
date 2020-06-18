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
          <a href="https://github.com/ufukcalimli/fellowship" target="_blank">
            <DiGithubBadge size="35px" />
            <DiGithubFull size="35px" />
          </a>
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
            <Link to="/">
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
        <div className="blm">
          <h4>#BlackLivesMatter </h4>
          <p>
            LangCommune stands with the protesters againts racism and police
            brutality. We encourage our community to get in the streets and join
            them if you can.{" "}
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
