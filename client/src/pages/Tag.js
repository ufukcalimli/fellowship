import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostList from "../components/PostList";
import { discussions, mockPosts } from "../mocks";
import "../styles/tag.scss";

const Tag = () => {
  const { id } = useParams();
  const handleFollow = (id) => {
    console.log(id);
    console.log("do something using the id");
  };

  return (
    <div className="tag_block">
      <Navbar />
      <div className="inner_block">
        <div className="flex_block">
          <h1>{id}</h1>
          <button className="btn_follow" onClick={() => handleFollow(id)}>
            Follow Tag
          </button>
        </div>
        <section className="s_flex_right">
          <button>Write a Post</button>
          <div>
            <h6>Discussions on that tag</h6>
            <ul>
              {discussions.map((discussion, i) => (
                <li>
                  <Link to={`/post/${discussions.id}`}>{discussion.title}</Link>
                </li>
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
