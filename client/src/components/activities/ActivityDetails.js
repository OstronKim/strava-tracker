import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import polyline from "@mapbox/polyline";
import Map from "../Map";

import "../styles/activityDetails.scss";

function ActivityDetails(props) {
  let { id } = useParams();
  const user = useSelector((state) => state.auth.user.username);
  const [Polylines, setPolylines] = useState([]);
  const activity = props.location.state.activity;
  let date_time = props.location.state.activity.start_date.split("T");
  const date = date_time[0];
  const time = date_time[1].split(":");

  const convertDistance = (dist) => {
    return (dist / 1000).toFixed(1);
  };

  useEffect(() => {
    let data = props.location.state.activity;
    const polylines = [];
    const activity_polyline = data.map.summary_polyline;
    // Skip polyline step if no route exists
    if (activity_polyline != null) {
      const activity_name = data.name;
      const activity_elevation = data.total_elevation_gain;
      const activity_distance = data.distance;
      polylines.push({
        activityPositions: polyline.decode(activity_polyline),
        activityName: activity_name,
        activityElevation: activity_elevation,
        activityDistance: activity_distance,
      });
    }
    setPolylines(polylines);
  }, [props.location.state.activity]);

  const getActivityImg = (type) => {
    if (type === "Run") {
      return "https://images.unsplash.com/photo-1610969524113-bae462bb3892?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
    } else if (type === "Ride") {
      return "https://images.unsplash.com/photo-1456990493443-0d0ee2a630cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    } else if (type === "Walk") {
      return "https://images.unsplash.com/photo-1526573461737-b504d8040d92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
    } else {
      return "https://images.unsplash.com/photo-1557330359-ffb0deed6163?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
    }
  };

  return (
    <div className="a-container">
      <div className="header">
        <h1>
          {user} - {activity.type}
        </h1>
      </div>
      <div className="item-left">
        <div className="item-left-left">
          <img className="image" src={getActivityImg(activity.type)} alt="" />
        </div>
        <div className="item-left-right">
          <h1>{activity.name}</h1>
          <p>Type of activity: {activity.type}</p>
          <p>
            {date} {time[0]}:{time[1]}, {activity.location_country}
          </p>
        </div>
      </div>
      <div className="item-right">
        <div className="item">
          <h1>{(activity.elapsed_time / 60).toFixed(1)} min </h1>
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
          <p>Highest elevation</p>
        </div>
        <div className="item">
          <h1>{activity.elev_low} m</h1>
          <p>Lowest elevation</p>
        </div>
        <div className="item">
          <h1>{activity.total_elevation_gain} m</h1>
          <p>Total elevation gain</p>
        </div>
      </div>
      <Map polylines={Polylines} />
    </div>
  );
}

export default ActivityDetails;
