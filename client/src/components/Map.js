import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Polyline } from "react-leaflet";

function Map(props) {
  const [currentPolylines, setCurrentPolylines] = useState([]);

  // Update polylines when props.polylines changes
  useEffect(() => {
    setCurrentPolylines(props.polylines);
  }, [props.polylines]);

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
        {currentPolylines.map((polyline, i) => (
          <Polyline key={i} positions={polyline.activityPositions}>
            <Popup>
              <div>
                <h2>{"Name: " + polyline.activityName}</h2>
                <p>{"Total Elevation Gain: " + polyline.activityElevation}</p>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
