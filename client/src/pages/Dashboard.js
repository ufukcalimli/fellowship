import React from "react";

const Dashboard = ({ user = [] }) => {
  return (
    <div>
      <Navbar />
      <section className="tags">
        <h3>Tags You are Following</h3>
        <ul>
          {user.tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Create A Post</h2>
      </section>
      <section className="user_info">
        <img alt="user_image" />
        <ul>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
