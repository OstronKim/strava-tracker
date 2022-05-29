import React from "react";
import { useParams } from "react-router-dom";

import "./styles/activityDetails.scss";

function ActivityDetails(props) {
  let { id } = useParams();
  const activity = props.location.state.activity;
  console.log(activity);
  return (
    <div className="container">
      <div className="header">
        <h1>Arvid - Run</h1>
      </div>
      <div className="item-left">
        <div className="item-left-left">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1610969524113-bae462bb3892?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />
        </div>

        <div className="item-left-right">
          <h1>Title</h1>
          <h3>Type of workout: Run</h3>
          <p>Date, country</p>
        </div>
      </div>
      <div className="item-right">
        <div className="item-right-sub">Distance</div>
        <div className="item-right-sub">Duration</div>
        <div className="item-right-sub">Pace</div>
        <div className="item-right-sub">Distance</div>
        <div className="item-right-sub">Duration</div>
        <div className="item-right-sub">Pace</div>
      </div>
    </div>
  );
}

export default ActivityDetails;
