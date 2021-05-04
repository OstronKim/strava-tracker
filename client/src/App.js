import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

import Map from "./components/Map";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
      </div>
    </Router>
  );
}

/* <Router>
  <div className="container">
    <Route path="/" exact component={Map} />
  </div>
</Router>; */

export default App;
