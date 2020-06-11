import React from "react";
import { Mutation } from "react-apollo";
import { GET_USERS, CREATE_USER } from "../queries/users";

const CreateUser = ({ signUpForm }) => {
  return (
    <Mutation
      mutation={CREATE_USER}
      update={(cache, { data: { createUser } }) => {
        const users = cache.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: {
              data: users.data.concat([createUser]),
              __typename: "User",
            },
          },
        });
      }}
    >
      <div>
        {(createUser, { data }) => (
          <input
            type="button"
            value="Sign Up"
            onClick={() =>
              createUser({
                variables: { signUpForm },
              })
            }
          />
        )}
      </div>
    </Mutation>
  );
};

export default CreateUser;
