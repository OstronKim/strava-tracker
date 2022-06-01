import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/style.scss";

class Landing extends Component {
  render() {
    return (
      <header className="landing-wrapper">
        <div className="row" style={{ marginTop: "20rem" }}>
          <div className="col s12 center-align">
            <h3>Welcome to your workout journal!</h3>
            <h4>
              Here you can keep track of your activities and connect them with
              your strava data
            </h4>
            <div className="col s6 right-align" style={{ marginTop: "2rem" }}>
              <Link
                to="/register"
                style={{
                  color: "white",
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s1 left-align" style={{ marginTop: "2rem" }}>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Landing;
