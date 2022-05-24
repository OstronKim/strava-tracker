import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import polyline from "@mapbox/polyline";
import Map from "./Map";
import WorkoutCards from "./WorkoutCards";

import "./styles/style.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.clientID = process.env.REACT_APP_STRAVA_CLIENTID;
    this.clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
    this.refreshToken = process.env.REACT_APP_STRAVA_REFRESH_TOKEN;
    this.auth_link = process.env.REACT_APP_STRAVA_AUTH_LINK;
    this.allActivities = {};

    this.state = {
      currentActivity: null, //Den nuvarande valda aktiviteten
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
    console.log("Just a check to see how often strava api call is run");
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
        polylines.push({
          activityPositions: polyline.decode(activity_polyline),
          activityName: activity_name,
          activityElevation: activity_elevation,
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
    const { user } = this.props.auth;
    console.log(this.allActivities);

    return (
      <div className="container">
        <h3>
          Hello <b> {user.username.split(" ")[0]} </b>
        </h3>
        <button onClick={this.onLogOutClick}>Logout</button>
        <WorkoutCards allActivities={this.allActivities} />
        <Map polylines={this.state.currentPolylines} />
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
