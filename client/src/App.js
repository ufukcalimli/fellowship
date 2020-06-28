import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
