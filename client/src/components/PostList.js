import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ mockPosts }) => {
  return (
    <div className="post_list">
      <h5>Posts on that tag</h5>
      {mockPosts.map((userPost) => {
        return (
          <div key={userPost.id}>
            <div className="post_info">
              <span>
                <strong> Written by</strong>{" "}
                <Link to={`/user/${userPost.user}`}> {userPost.user}</Link>
              </span>
              <span>{`Created at: ${userPost.post.date}`}</span>
            </div>
            <h6>
              <Link to={`/post/${userPost.id}`}>{userPost.post.title}</Link>
            </h6>
            <p>{userPost.post.content}</p>
            <div>
              {userPost.post.tags.map((tag) => (
                <span className="post_tags">
                  <Link to={`/tag/${tag}`}>{`#${tag}`}</Link>
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
