import React from "react";
import Header from "../components/Header";
import "../styles/landing.scss";
import { Redirect, useHistory } from "react-router-dom";
import LangLearn from "../images/langlearn.png";
import Community from "../images/community.jpg";
import CommunicatePic from "../images/communicate.png";
import { user } from "../mocks";

const Landing = () => {
  let history = useHistory();
  return (
    <React.Fragment>
      {user && <Redirect to="/home" />}
      <Header />
      <div className="landing-container">
        <section className="landing__intro">
          <div className="intro">
            <h2>Who Are We?</h2>
            <p>
              We are a group of language lovers (and developers) who believe the
              importance of learning new languages. We are aware that language
              learning comes with lots of challenges. Therefore, we want to be
              in solidarity. We believe that this platform can help us share the
              love and learn!
            </p>
          </div>
          <div className="intro__image">
            <img src={LangLearn} alt="intro_img" />
          </div>
        </section>
        <section className="landing__site_info">
          <div>
            <img src={CommunicatePic} alt="site_info_img" />
          </div>
          <div>
            <h2>What You Can Do Here?</h2>
            <p>
              Here you can meet other language learners and teachers that are
              willing to help you and learn from you at the same time! You can
              share and discuss your ideas about languages, language learning.
            </p>
          </div>
        </section>
        <section className="landing__explore">
          <div>
            <h2>Interested?</h2>
            <p>
              Sounds fun? Then don't waste your time and be a part of the
              community already!
            </p>
            <button
              className="btn_signup"
              onClick={() => history.push("/signup")}
            >
              Join The Community!
            </button>
          </div>
          <div>
            <img src={Community} alt="comminty-illustration-pic" />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Landing;
