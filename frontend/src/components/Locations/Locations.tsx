import React, { useState } from "react";
import "./locations.css";
import axios from "axios";

export const results: any[] = [[38.96706144160038, -95.27324507168542]];

export function Locations(): JSX.Element {
  const locations: string[] = [];

  function modifySuggestions(
    routeInfo: object & { [path: string]: Array<number> }
  ) {
    const suggestions = document.getElementById("suggestions");
    const fromDest = routeInfo.path[0];
    const toDest = routeInfo.path[1];

    let isFirst = true;
    Object.keys(routeInfo).forEach((key) => {
      if (key !== "path") {
        const row = document.createElement("tr");
        const routeElement = document.createElement("td");
        const nameElement = document.createElement("td");
        const coordsElement = document.createElement("td");
        routeElement.textContent = isFirst ? `${fromDest} to ${toDest}` : "---";
        nameElement.textContent = key;
        coordsElement.textContent = `${routeInfo[key][0]}, ${routeInfo[key][1]}
        `;

        row.appendChild(routeElement);
        row.appendChild(nameElement);
        row.appendChild(coordsElement);
        results.push([routeInfo[key][0], routeInfo[key][1]]);

        suggestions?.appendChild(row);

        isFirst = false;
      }
    });
  }

  function addLocation(e: React.BaseSyntheticEvent) {
    //@ts-expect-error
    if (e.code === "Enter") {
      locations.push(e.target.value);
      const newChild = document.createElement("p");
      newChild.textContent = e.target.value;
      document.getElementById("stopContainer")?.appendChild(newChild);
      if (locations.length > 1) {
        axios({
          method: "get",
          url: "http://localhost:8000/get_route/",
          params: {
            placeOne: locations[locations.length - 2],
            placeTwo: locations[locations.length - 1],
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }).then((response) => {
          response.data["path"] = [
            locations[locations.length - 2],
            locations[locations.length - 1],
          ];
          modifySuggestions(response.data);
        });
      }

      e.target.value = "";
    }
  }
  return (
    <>
      <div style={{ position: "relative", display: "flex", overflow: "auto" }}>
        <LocationSearch onSubmit={addLocation} />
        <div id="stopContainer" />
      </div>
      <Suggestions />
    </>
  );
}

function LocationSearch({ onSubmit }: any): JSX.Element {
  return (
    <>
      <div style={{ overflow: "auto", width: "1000%" }}>
        <h2>Destinations</h2>
        <hr></hr>
        <input
          type="text"
          id="placeEnter"
          onKeyDown={onSubmit}
          placeholder="Add Stop..."
        ></input>
      </div>
    </>
  );
}

function Suggestions(): JSX.Element {
  return (
    <>
      <h1
        style={{
          position: "absolute",
          top: "105vh",
        }}
      >
        Suggestions
      </h1>
      <div
        style={{
          position: "absolute",
          top: "120vh",
          margin: 0,
          width: "100%",
        }}
      >
        <table style={{ width: "100%", overflow: "auto" }} id="suggestions">
          <tr>
            <th>Route</th>
            <th>Location Name</th>
            <th>Coordinates</th>
          </tr>
        </table>
      </div>
    </>
  );
}
