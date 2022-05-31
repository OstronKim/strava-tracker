import React from "react";
import { useParams } from "react-router-dom";

import "./styles/activityDetails.scss";

function ActivityDetails(props) {
  let { id } = useParams();
  const activity = props.location.state.activity;
  let date_time = props.location.state.activity.start_date.split("T");
  const date = date_time[0];
  const time = date_time[1].split(":");
  console.log(date, time);
  console.log(activity);
  const convertDistance = (dist) => {
    return (dist / 1000).toFixed(1);
  };
  return (
    <div className="container">
      <div className="header">
        <h1>Arvid - {activity.type}</h1>
      </div>
      <div className="item-left">
        <div className="item-left-left">
          <img
            className="image"
            src="https://images.unsplash.com/photo-1610969524113-bae462bb3892?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </div>
        <div className="item-left-right">
          <h1>{activity.name}</h1>
          <p>Type of activity: Run</p>
          <p>
            {date} {time[0]}:{time[1]}, {activity.location_country}
          </p>
        </div>
      </div>
      <div className="item-right">
        <div className="item">
          <h1>{activity.elapsed_time} s </h1>
          <p>Duration</p>
        </div>
        <div className="item">
          <h1>{convertDistance(activity.distance)} km</h1>
          <p>Distance</p>
        </div>
        <div className="item">
          <h1>{activity.average_speed.toFixed(1)} m/s</h1>
          <p>Pace</p>
        </div>
        <div className="item">
          <h1>{activity.elev_high} m</h1>
          <p>Upwards elevation</p>
        </div>
        <div className="item">
          <h1>{activity.elev_low}</h1>
          <p>Downwards elevation</p>
        </div>
        <div className="item">
          <h1>{activity.total_elevation_gain} m</h1>
          <p>Total elevation gain</p>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetails;
