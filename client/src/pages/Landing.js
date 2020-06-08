import React from "react";
import "../styles/landing.scss";

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="landing__intro">
        <div className="intro">
          <h2>Who Are We?</h2>
          <p>
            We are two language lovers (and developers) who believe the
            importance of learning new languages. We are aware that language
            learning comes with lots of challenges. Therefore, we want to be in
            solidarity. We believe that this platform can help us share the love
            and learn!
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
          <h2>Who Are We?</h2>
          <p>
            We are two language lovers (and developers) who believe the
            importance of learning new languages. We are aware that language
            learning comes with lots of challenges. Therefore, we want to be in
            solidarity. We believe that this platform can help us share the love
            and learn!
          </p>
        </div>
      </section>
      <section className="landing__explore">
        <div>
          <h2>Who Are We?</h2>
          <p>
            We are two language lovers (and developers) who believe the
            importance of learning new languages. We are aware that language
            learning comes with lots of challenges. Therefore, we want to be in
            solidarity. We believe that this platform can help us share the love
            and learn!
          </p>
        </div>
        <div></div>
      </section>
    </div>
  );
};

export default Landing;
