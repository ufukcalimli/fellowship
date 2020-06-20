import React from "react";

const PostList = ({ mockPosts }) => {
  return (
    <div className="post_list">
      <h5>Posts on that tag</h5>
      {mockPosts.map((userPost) => {
        return (
          <div key={userPost.id}>
            <div>
              <span>{`Written by ${userPost.user}`}</span>
              <span>{`Created: ${userPost.post.date}`}</span>
            </div>
            <h6>{userPost.post.title}</h6>
            <p>{userPost.post.content}</p>
            {userPost.post.tags.map((tag) => (
              <span>{tag}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
