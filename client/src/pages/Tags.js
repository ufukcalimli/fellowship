import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { mockTags } from "../mocks";
import { Link } from "react-router-dom";
import "../styles/tags.scss";

const Tags = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="tags_page">
        <h1>Top 50 Popular Tags</h1>
        <div className="most-popular-tags">
          <ul className="tag_list">
            {mockTags.map((tag) => (
              <li>
                <Link to={`/tag/${tag}`}>{`#${tag}`}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tags;
