import React from "react";
import Header from "../components/Header";
import "../styles/landing.scss";

const Landing = () => {
  return (
    <React.Fragment>
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
            <img alt="intro_img" />
          </div>
        </section>
        <section className="landing__site_info">
          <div>
            <img alt="site_info_ing" />
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
          </div>
          <div></div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Landing;
