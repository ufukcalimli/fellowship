import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, HttpLink } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { RestLink } from "apollo-link-rest";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const restLink = new RestLink({
  uri: "http://localhost:5000",
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<ApolloApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
