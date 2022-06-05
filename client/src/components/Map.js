import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Polyline } from "react-leaflet";

function Map(props) {
  const [currentPolylines, setCurrentPolylines] = useState([]);
  const colors = ["blue", "orange", "red", "black", "purple"];

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
        />
        {currentPolylines.map((polyline, i) => (
          <Polyline
            key={i}
            positions={polyline.activityPositions}
            color={colors[i]}
          >
            <Popup>
              <div>
                <h2>{polyline.activityName}</h2>
                <p>{"Distance: " + polyline.activityDistance + "m"}</p>
                <p>
                  {"Total Elevation Gain: " + polyline.activityElevation + "m"}
                </p>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
