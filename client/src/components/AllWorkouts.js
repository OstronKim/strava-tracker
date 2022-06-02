import React, { useEffect, useState } from "react";
import Wcard from "./Wcard";
import { useLocation } from "react-router-dom";

import "./styles/allWorkouts.scss";

function getSummary(activities) {
  let summary = {
    nrActivities: 0,
    distance: 0,
    time: 0,
    elevation: 0,
    runs: 0,
    rides: 0,
    walks: 0,
  };
  for (let i = 0; i < activities.length; i++) {
    summary.nrActivities += 1;
    summary.distance += activities[i].distance;
    summary.time += activities[i].elapsed_time;
    summary.elevation += activities[i].total_elevation_gain;
    if (activities[i].type === "Run") summary.runs += 1;
    if (activities[i].type === "Ride") summary.rides += 1;
    if (activities[i].type === "Walk") summary.walks += 1;
  }
  summary.distance = (summary.distance / 1000).toFixed(1);
  summary.elevation = summary.elevation.toFixed(0);
  summary.time = (summary.time / 60).toFixed(0);
  return summary;
}
function AllWorkouts(props) {
  const [allActivities, setAllActivities] = useState([]);
  const location = useLocation();
  let summary = {};

  useEffect(() => {
    if (location.state.allActivities != null) {
      setAllActivities(location.state.allActivities);
    }
  }, [location.state.allActivities]);

  summary = getSummary(location.state.allActivities);
  console.log(summary);

  return (
    <div className="allWorkouts-container">
      <div className="top-bar">
        <h1>All your activities</h1>
      </div>
      <div className="page">
        <aside className="col sidebar">
          <h2>Summary</h2>
          <div className="sidebar-content">
            <p>Activities</p>
            <p>{summary.nrActivities}</p>
            <p>Total distance</p>
            <p>{summary.distance} km</p>
            <p>Total duration</p>
            <p>{summary.time} minutes</p>
            <p>Total elevation</p>
            <p>{summary.elevation} m</p>
            <p>Runs</p>
            <p>{summary.runs}</p>
            <p>Rides</p>
            <p>{summary.rides}</p>
            <p>walks</p>
            <p>{summary.walks}</p>
          </div>
        </aside>
        <div className="workouts">
          {Object.values(allActivities).map(function (activity, i) {
            return <Wcard key={i} info={activity} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllWorkouts;
