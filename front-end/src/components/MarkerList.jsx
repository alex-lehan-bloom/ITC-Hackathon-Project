import React from "react";
import "./Marker.css";

const Marker = (props) => {
  const { color, name, arrayOfCoordinates, id } = props;
  return arrayOfCoordinates.map((coordinates) => {
    return (
      <div
        className="marker"
        style={{ backgroundColor: color, cursor: "pointer" }}
        title={name}
      />
    );
  });
};

export default Marker;
