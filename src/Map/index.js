import React, { Component, Fragment } from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import { Motion, spring } from "react-motion";
import ReactTooltip from "react-tooltip";

import { STYLES_MAP, CITIES } from "./constants";
import { formatNumberDecimal } from "./utils";
import "./styles.css";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      center: [-62, -40],
      zoom: 2,
      x: -62,
      y: -40,
      cities: CITIES
    };
    this.handleCityClick = this.handleCityClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCitySelection = this.handleCitySelection.bind(this);
  }
  handleCityClick(city) {
    this.setState({
      zoom: 9,
      center: city.coordinates
    });
  }
  handleReset() {
    this.setState({
      center: [-62, -40],
      zoom: 2
    });
  }
  handleCitySelection(evt) {
    const cityId = evt.target.getAttribute("data-city");
    const city = this.state.cities[cityId];
    this.setState({
      center: city.coordinates,
      zoom: 9
    });
  }
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="buttonContainerCities">
            {this.state.cities &&
              this.state.cities.map((city, i) => (
                <button
                  key={i}
                  className="buttonCity"
                  data-city={i}
                  onClick={this.handleCitySelection}
                >
                  {city.name}
                </button>
              ))}
            <button className="button" onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </div>
        <Motion
          defaultStyle={{
            zoom: this.state.zoom,
            x: this.state.x,
            y: this.state.y
          }}
          style={{
            zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
            x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
            y: spring(this.state.center[1], { stiffness: 210, damping: 20 })
          }}
        >
          {({ zoom, x, y }) => (
            <ComposableMap
              projectionConfig={{ scale: this.props.data.scale }}
              width={this.props.data.width}
              height={this.props.data.height}
            >
              <ZoomableGroup center={[x, y]} zoom={zoom}>
                <Geographies geography={this.props.data.map}>
                  {(geographies, projection) =>
                    geographies.map(geography => {
                      const geographyValue = `$ ${formatNumberDecimal(
                        geography.properties.VALUE
                      )}`;
                      return (
                        <Geography
                          key={geography.properties.NAME}
                          data-tip={`${
                            geography.properties.NAME
                          } ${geographyValue}`}
                          geography={geography}
                          projection={projection}
                          precision={0.5}
                          style={{
                            default: STYLES_MAP.default,
                            hover: STYLES_MAP.hover,
                            pressed: STYLES_MAP.pressed
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                <Markers>
                  {this.state.cities &&
                    this.state.cities.map((city, i) => (
                      <Marker
                        key={i}
                        marker={city}
                        onClick={this.handleCityClick}
                      >
                        <circle
                          cx={0}
                          cy={0}
                          r={4}
                          fill="#FF5722"
                          stroke="#DF3702"
                        />
                      </Marker>
                    ))}
                </Markers>
              </ZoomableGroup>
            </ComposableMap>
          )}
        </Motion>
        <ReactTooltip />
      </Fragment>
    );
  }
}

export default Map;
