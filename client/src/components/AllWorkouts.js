import React, { useEffect, useState } from "react";
import Wcard from "./Wcard";
import { useLocation } from "react-router-dom";

function AllWorkouts(props) {
  const [allActivities, setAllActivities] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state.allActivities != null) {
      setAllActivities(location.state.allActivities);
    }
  }, [location.state.allActivities]);

  return (
    <div className="cardRow">
      {Object.values(allActivities).map(function (activity, i) {
        return <Wcard key={i} info={activity} />;
      })}
    </div>
  );
}

export default AllWorkouts;
