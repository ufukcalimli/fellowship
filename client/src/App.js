import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Tags from "./pages/Tags";
import Tag from "./pages/Tag";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tag/:id" component={Tag} />
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
