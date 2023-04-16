import React from "react";
import "./map.css";

export function EmbeddedMap(): JSX.Element {
  return (
    <>
      <div></div>
      <iframe
        style={{ width: "100%", height: "90%" }}
        id="map"
        className="map"
        src={`https://www.google.com/maps/embed/v1/view?key=${process.env.API_KEY}&center=38.95441054473419, -95.25575320887214`}
        allowFullScreen
      />
    </>
  );
}
