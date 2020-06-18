import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
