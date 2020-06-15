import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { GET_USERS, CREATE_USER } from "../queries/users";

const CreateUser = ({ signUpForm }) => {
  const [createUser, { data }] = useMutation(CREATE_USER);
  return (
    <div>
      <input
        type="button"
        value="Sign Up"
        onClick={() =>
          createUser({
            variables: { input: signUpForm },
          })
        }
      />
    </div>
  );
};

export default CreateUser;
