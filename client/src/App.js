import React from "react";
import Map from "./components/Map";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Map} />
      </div>
    </Router>
  );
}

export default App;
