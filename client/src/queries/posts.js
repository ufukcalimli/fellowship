import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPosts {
    posts @rest(type: "Posts", path: "/api/post") {
      title
      content
      create_date
      creator
      label
      tags
      comments
    }
  }
`;
