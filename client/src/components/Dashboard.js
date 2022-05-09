import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import Map from "./Map";
import WorkoutCards from "./WorkoutCards";

import "./styles/style.scss";

class Dashboard extends Component {
  onLogOutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container">
        <h3>
          Hello <b> {user.username.split(" ")[0]} </b>
        </h3>
        <button onClick={this.onLogOutClick}>Logout</button>
        <WorkoutCards />
        <Map />
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
