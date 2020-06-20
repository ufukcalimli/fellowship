import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Tags from "./pages/Tags";
import Tag from "./pages/Tag";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tag/:id" component={Tag} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
