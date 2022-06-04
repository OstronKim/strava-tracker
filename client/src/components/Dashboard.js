import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import polyline from "@mapbox/polyline";
import Map from "./Map";
import WorkoutCards from "./WorkoutCards";
import Button from "@mui/material/Button";

import "./styles/style.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.user = this.props.auth.user;
    this.clientID = this.props.auth.user.clientID;
    this.clientSecret = this.props.auth.user.clientSecret;
    this.refreshToken = this.props.auth.user.refreshToken;
    this.auth_link = process.env.REACT_APP_STRAVA_AUTH_LINK;
    this.allActivities = {};

    this.state = {
      currentPolylines: [],
    };
  }

  async componentDidMount() {
    const stravaAuthResponse = await axios.all([
      axios.post(
        `${this.auth_link}?client_id=${this.clientID}&client_secret=${this.clientSecret}&refresh_token=${this.refreshToken}&grant_type=refresh_token`
      ),
    ]);
    const respAccessToken = stravaAuthResponse[0].data.access_token;
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${respAccessToken}`;
    fetch(activities_link)
      .then((res) => res.json())
      .then((data) => {
        this.allActivities = data;
        this.calcPolylines(data);
      });
  }

  //Calculate and update state of the polylines given activities
  calcPolylines = (data) => {
    const polylines = [];
    for (let i = 0; i < data.length; i += 1) {
      const activity_polyline = data[i].map.summary_polyline;
      // Skip polyline step if no route exists
      if (activity_polyline != null) {
        const activity_name = data[i].name;
        const activity_elevation = data[i].total_elevation_gain;
        const activity_distance = data[i].distance;
        polylines.push({
          activityPositions: polyline.decode(activity_polyline),
          activityName: activity_name,
          activityElevation: activity_elevation,
          activityDistance: activity_distance,
        });
      }
    }
    this.setState({ currentPolylines: polylines });
  };

  onLogOutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    console.log(this.allActivities);

    return (
      <div className="container">
        <div className="dashboard-content">
          <div className="dashboard-top-bar">
            <h3>
              Hello <b> {this.user.username.split(" ")[0]} </b>
            </h3>
            <Button
              variant="contained"
              size="small"
              onClick={this.onLogOutClick}
              sx={{
                backgroundColor: "orange",
                color: "#272343",
                fontWeight: "bold",
                ":hover": {
                  bgcolor: "orange",
                },
              }}
            >
              Logout
            </Button>
          </div>
          <WorkoutCards allActivities={this.allActivities} />
          <div className="see-all-btn">
            <Link
              to={{
                pathname: "/allworkouts",
                state: { allActivities: this.allActivities },
              }}
            >
              <Button
                variant="text"
                sx={{
                  color: "#272343",
                  fontWeight: "bold",
                  ":hover": {
                    bgcolor: "orange",
                  },
                }}
              >
                See all workouts
              </Button>
            </Link>
          </div>
          <Map polylines={this.state.currentPolylines} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
