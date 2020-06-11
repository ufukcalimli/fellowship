import gql from "graphql-tag";

export const GET_USERS = gql`
  query getUsers {
    users @rest(type: "User", path: "/api/user") {
      name
      email
      role
      password
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: signUpForm!) {
    createUser(input: $signUpForm)
      @rest(type: "User", path: "/api/user", method: "POST") {
      firstname
      email
      role
      password
    }
  }
`;
