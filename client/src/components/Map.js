import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Polyline } from "react-leaflet";
import axios from "axios";
import polyline from "@mapbox/polyline";

function Map() {
  const [activities, setActivites] = useState([]);

  const clientID = process.env.REACT_APP_STRAVA_CLIENTID;
  const clientSecret = process.env.REACT_APP_STRAVA_CLIENT_SECRET;
  const refreshToken = process.env.REACT_APP_STRAVA_REFRESH_TOKEN;
  const auth_link = process.env.REACT_APP_STRAVA_AUTH_LINK;
  const all_activities_link = process.env.REACT_APP_STRAVA_ALL_ACTIVITIES_LINK;
  const accessToken = process.env.REACT_APP_STRAVA_ACCESS_TOKEN;

  //UseEffect is a hook that runs at first render and also after every update
  //TODO: Maybe not use useEffect function for this since strava limits the amount of requests. Consider using it in ComponentDidMount and a button to fetch it on demand.

  useEffect(() => {
    async function getActivites(res) {
      const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`;
      fetch(activities_link)
        .then((res) => res.json())
        .then((data) => {
          const polylines = [];
          for (let i = 0; i < data.length; i += 1) {
            const activity_polyline = data[i].map.summary_polyline;
            // Skip polyline step if no route exists
            if (activity_polyline != null) {
              const activity_name = data[i].name;
              const activity_elevation = data[i].total_elevation_gain;
              polylines.push({
                activityPositions: polyline.decode(activity_polyline),
                activityName: activity_name,
                activityElevation: activity_elevation,
              });
            }
          }
          console.log(polylines);
          setActivites(polylines);
        });
    }
    getActivites();

    // async function fetchData() {
    //   console.log("fetch data called");
    //   const stravaAuthResponse = await axios.all([
    //     //Get a fresh access token. Maybe not call it in useEffect function since it updates frequently.
    //     axios.post(
    //       `${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
    //     ),
    //   ]);
    //   console.log(stravaAuthResponse[0].data.access_token);
    //   //Use the fresh access token to get all activities
    //   const stravaActivityResponse = await axios.get(
    //     `${all_activities_link}?access_token=${stravaAuthResponse[0].data.access_token}`
    //   );
    //   //console.log(stravaActivityResponse);
    //   const polylines = [];
    //   for (let i = 0; i < stravaActivityResponse.data.length; i += 1) {
    //     const activity_polyline =
    //       stravaActivityResponse.data[i].map.summary_polyline;
    //     const activity_name = stravaActivityResponse.data[i].name;
    //     const activity_elevation =
    //       stravaActivityResponse.data[i].total_elevation_gain;
    //     polylines.push({
    //       activityPositions: polyline.decode(activity_polyline),
    //       activityName: activity_name,
    //       activityElevation: activity_elevation,
    //     });
    //   }
    //   setActivites(polylines);
    // }
  }, []); //[] to avoid useEffect infinite loop

  return (
    <div className="Map">
      <MapContainer
        center={[58.588455, 16.188313]} //Norrköping
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
