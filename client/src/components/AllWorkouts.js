import React, { useEffect, useState } from "react";
import Wcard from "./Wcard";
import { useLocation } from "react-router-dom";

import "./styles/allWorkouts.scss";

function AllWorkouts(props) {
  const [allActivities, setAllActivities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state.allActivities != null) {
      setAllActivities(location.state.allActivities);
    }
  }, [location.state.allActivities]);

  return (
    <div className="allWorkouts-container">
      <div className="top-bar">
        <h1>All your activities</h1>
      </div>
      <div className="page">
        <aside className="col sidebar">
          <h2>Summary</h2>
          <p>fasfhsakhfjks</p>
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
