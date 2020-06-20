import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import { discussions, mockPosts } from "../mocks";
import "../styles/tag.scss";

const Tag = () => {
  const { id } = useParams();
  return (
    <div className="tag_block">
      <Navbar />
      <div className="inner_block">
        <div className="flex_block">
          <h1>{id}</h1>
          <button className="btn_follow">Follow Tag</button>
        </div>
        <section className="s_flex_left">
          <div>
            <p>Would you like to start a discussion related to this tag?</p>
            <button>Write a Post</button>
          </div>
        </section>
        <section className="s_flex_right">
          <div>
            <h6>Discussions on that tag</h6>
            <ul>
              {discussions.map((discussion) => (
                <li>{discussion.title}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="s_flex_mid">
          <PostList mockPosts={mockPosts} />
        </section>
      </div>
    </div>
  );
};

export default Tag;
