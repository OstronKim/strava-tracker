import React from "react";
import { useParams } from "react-router-dom";

function ActivityDetails() {
  let { id } = useParams();
  return <div>ID: {id}</div>;
}

export default ActivityDetails;
