import React from "react";
import { useParams } from "react-router-dom";

const Tag = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
      <section>
        <div>
          <p>Would you like to start a discussion related to this tag?</p>
          <button>Write a Post</button>
        </div>
      </section>
    </div>
  );
};

export default Tag;
