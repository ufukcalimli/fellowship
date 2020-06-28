import React from "react";
import Navbar from "../components/Navbar";
import Lost from "../images/lost.gif";
import "../styles/notFoundPage.scss";

const NotFoundPage = () => {
  return (
    <div className="page_not_found">
      <div>
        <Navbar />
      </div>
      <div className="inquirer">
        <h1>Ooooopps...</h1>
        <h4>Seems like you're lost!</h4>
      </div>
      <iframe
        className="lost_gif"
        src={Lost}
        width="331"
        height="480"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default NotFoundPage;
