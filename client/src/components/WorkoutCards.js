import React from "react";

function Card(props) {
  return (
    <div className="card">
      <div className="cardBody">
        {/* <img src={props.img} /> */}
        <h2 className="cardTitle">{props.title}</h2>
        <ul className="cardDescription">
          <li>Distance</li>
          <li>Average pace</li>
          <li>Elevation gain</li>
        </ul>
      </div>
    </div>
  );
}
let titles = ["one", "two", "three"];

//Egentligen ta in de 5 senaste (eller färre om inte 5 finns) och hämta ut ur props
function WorkoutCards(props) {
  return (
    <div className="cardRow">
      {titles.map(function (title) {
        return <Card title={title} />;
      })}
    </div>
  );
}

export default WorkoutCards;
