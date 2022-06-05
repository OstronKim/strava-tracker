import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import "./styles/style.scss";

class Landing extends Component {
  render() {
    return (
      <header className="landing-wrapper">
        <div className="row" style={{ marginTop: "20rem" }}>
          <div className="col s12 center-align">
            <h2>Welcome to your Strava tracker!</h2>
            <h4>Here you can keep track of your activities on Strava</h4>
            <div className="col s6 right-align" style={{ marginTop: "2rem" }}>
              <Link to="/register">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "140px",
                    height: "50px",
                    backgroundColor: "orange",
                    color: "#272343",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "orange",
                    },
                  }}
                >
                  Register
                </Button>
              </Link>
            </div>
            <div className="col s1 left-align" style={{ marginTop: "2rem" }}>
              <Link to="/login">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "140px",
                    height: "50px",
                    backgroundColor: "orange",
                    color: "#272343",
                    fontWeight: "bold",
                    ":hover": {
                      bgcolor: "orange",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Landing;
