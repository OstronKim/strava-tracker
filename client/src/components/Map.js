import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Polyline,
} from "react-leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";

function Map() {
  const [activities, setActivites] = useState([]);

  //TODO: put in env variables
  const clientID = "64677";
  const clientSecret = "f4b95ee6580a048b06f83303dda5cf7e8f9af2f0";
  const refreshToken = "4adc2b41cef2b8d0181896bcb329365ae687fd07";
  const auth_link = "https://www.strava.com/oauth/token";
  const all_activities_link = `https://www.strava.com/api/v3/athlete/activities`;

  //UseEffect is a hook that runs at first render and also after every update
  //TODO: Maybe not use useEffect function for this since strava limits the amount of requests. Consider using it in ComponentDidMount and a button to fetch it on demand.
  useEffect(() => {
    async function fetchData() {
      const stravaAuthResponse = await axios.all([
        //Get a fresh access token. Maybe not call it in useEffect function since it updates frequently.
        axios.post(
          `${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
        ),
      ]);
      //Use the fresh access token to get all activities
      const stravaActivityResponse = await axios.get(
        `${all_activities_link}?access_token=${stravaAuthResponse[0].data.access_token}`
      );

      const polylines = [];
      for (let i = 0; i < stravaActivityResponse.data.length; i += 1) {
        const activity_polyline =
          stravaActivityResponse.data[i].map.summary_polyline;
        const activity_name = stravaActivityResponse.data[i].name;
        const activity_elevation =
          stravaActivityResponse.data[i].total_elevation_gain;
        polylines.push({
          activityPositions: polyline.decode(activity_polyline),
          activityName: activity_name,
          activityElevation: activity_elevation,
        });
      }
      setActivites(polylines);
    }
    fetchData();
  }, []); //[] to avoid useEffect infinite loop

  return (
    <div className="Map">
      <MapContainer
        center={[59.417875, 13.481069]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
        />
        {activities.map((activity, i) => (
          <Polyline key={i} positions={activity.activityPositions}>
            <Popup>
              <div>
                <h2>{"Name: " + activity.activityName}</h2>
                <p>{"Total Elevation Gain: " + activity.activityElevation}</p>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
