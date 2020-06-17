import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { discussions } from "../mocks";
import "../styles/tag.scss";

const Tag = () => {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <div className="tag_block">
        <h1>{id}</h1>
        <button>Follow Tag</button>
        <section>
          <div>
            <p>Would you like to start a discussion related to this tag?</p>
            <button>Write a Post</button>
          </div>
        </section>
        <section>
          <div>
            <h6>Discussion on that tag</h6>
            <ul>
              {discussions.map((discussion) => (
                <li>{discussion.title}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tag;
