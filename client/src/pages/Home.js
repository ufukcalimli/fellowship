import React from "react";
import { Query } from "react-apollo";
import { GET_USERS } from "../queries/users";
import "../styles/home.scss";
import Navbar from "../components/Navbar";

const Home = ({ user }) => (
  <div className="homepage_main">
    <section className="homepage_header">
      <Navbar user={false} />
    </section>
    <section className="homepage_tags">Popular Tags</section>
    <section className="homepage_posts">Latest Posts</section>

    {/* <Query query={GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data) {
          console.log(data);
          return (
            <div>
              {data.users.map((data) => (
                <div>
                  <p>{data.name}</p>
                  <p>{data.email}</p>
                </div>
              ))}
            </div>
          );
        }
      }}
    </Query> */}
  </div>
);

export default Home;
