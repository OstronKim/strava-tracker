import React, { useEffect, useState } from "react";
import Wcard from "./Wcard";

function WorkoutCards(props) {
  const [latestActivities, setLatestActivities] = useState([]);

  useEffect(() => {
    let la = [];
    if (props.allActivities != null) {
      for (let i = 0; i < Object.keys(props.allActivities).length; i++) {
        if (i === 5) break;
        la.push(props.allActivities[i]);
      }
      setLatestActivities(la);
    }
  }, [props.allActivities]);

  console.log(latestActivities);
  return (
    <div className="cardRow">
      {latestActivities.map(function (activity, i) {
        return <Wcard key={i} info={activity} />;
      })}
    </div>
  );
}

export default WorkoutCards;
