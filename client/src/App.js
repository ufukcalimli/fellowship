import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import { Header } from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/landing" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
