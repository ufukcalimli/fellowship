import React, { useEffect, useState } from "react";
import { FaHeart, FaClipboardList } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import { MdEmail, MdHelpOutline } from "react-icons/md";
import axios from "axios";
import "../styles/home.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { discussions, user } from "../mocks";

const Home = () => {
  const [posts, setPosts] = useState({ allPosts: [], comments: [] });
  const { allPosts, comments } = posts;
  const mockTags = [
    "english",
    "languageLearn",
    "learningMethods",
    "french",
    "idioms",
    "grammar",
    "languageApps",
    "spanish",
    "dutch",
  ];

  const mockPostTags = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipisicing",
    "elit",
  ];

  useEffect(() => {
    function getPosts() {
      return axios.get("https://jsonplaceholder.typicode.com/posts");
    }

    function getComments() {
      return axios.get("https://jsonplaceholder.typicode.com/comments");
    }

    async function getAllPromises() {
      await axios.all([getPosts(), getComments()]).then(
        axios.spread(function (psts, cmments) {
          setPosts((prevState) => ({
            allPosts: [...prevState.allPosts, allPosts.concat(psts.data)],
            comments: [comments.concat(cmments.data)],
          }));
        })
      );
    }

    getAllPromises();
  }, []);

  console.log("allPosts", allPosts);
  return (
    <React.Fragment>
      <div className="homepage_main">
        <section className="homepage_header">
          <Navbar user={false} />
        </section>
        <div className="post_info">
          <div className="flex-div">
            <h2>Posts</h2>
            <ul>
              <li>Latest</li>
              <li>Week</li>
            </ul>
          </div>
        </div>
        <section className="homepage_general">
          <h6>General</h6>
          <ul>
            <li>
              <Link to="#">
                <FaClipboardList />
                Reading List
              </Link>
            </li>
            <li>
              <Link to="/tags">
                <AiFillTags />
                Tags
              </Link>
            </li>
            <li>
              <Link to="#">
                <MdHelpOutline />
                FAQ
              </Link>
            </li>
            <li>
              <Link to="#">
                <MdEmail />
                Contact
              </Link>
            </li>
          </ul>
        </section>
        <section className="homepage_tags">
          <h6>Popular Tags</h6>
          <ul>
            {mockTags.map((tag, i) => (
              <li className="tag-item" id={i} key={i}>
                <Link to={`/tag/${tag}`}>{`#${tag}`}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="discussions">
          <h6>Latest Discusssions</h6>
          <ul>
            {discussions.map((discussion, i) => (
              <li key={i}>{discussion.title}</li>
            ))}
          </ul>
        </section>
        <section className="homepage_posts">
          {allPosts.length &&
            allPosts[0].map((post) => {
              const comm = comments.filter((c) => c.postId === post.userId);

              return (
                <article className="posts" key={post.id}>
                  <span className="post_owner">{`Written by ${post.userId}`}</span>{" "}
                  <label className="post_label"> Label </label>
                  <span className="post_date">Create date</span>
                  <h2>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p>{post.body}</p>
                  <section className="posts_commments">
                    <ul>
                      <li>
                        <FaHeart color="red" /> Likes 23{" "}
                      </li>
                      <li>Comments: {comm.length}</li>
                    </ul>
                  </section>
                  <div className="tags">
                    {mockPostTags.map((postTag) => (
                      <span>{`#${postTag}`}</span>
                    ))}
                  </div>
                </article>
              );
            })}
        </section>
      </div>
    </React.Fragment>
  );
};

export default Home;
