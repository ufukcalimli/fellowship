import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
