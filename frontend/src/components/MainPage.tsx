import React from "react";
import { EmbeddedMap } from "./Map/EmbeddedMap";
import { Header } from "./Header/Header";
import { Locations } from "./Locations/Locations";

export function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

function Body(): JSX.Element {
  return (
    <div
      id="content"
      style={{ height: "100%", display: "flex", border: "10px" }}
    >
      <Locations />
      <EmbeddedMap />
    </div>
  );
}
