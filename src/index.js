import React from "react";
import ReactDOM from "react-dom";

import Map from "./Map";
import { MAP_JSON } from "./Map/constants";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <div className="map">
        <Map
          data={{
            map: MAP_JSON,
            width: 600,
            height: 500,
            center: [-62, -40],
            scale: 420,
            currency: "$"
          }}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
