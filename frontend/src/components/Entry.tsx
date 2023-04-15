import React from "react";
import { createRoot } from "react-dom/client";
import { EntryRoutes } from "./Routes/EntryRouter";
import { MainPage } from "./MainPage";

function entry(): void {
  globalThis.window.addEventListener("load", () => {
    const root = document.getElementById("root");

    if (root === null) throw new Error("Can't find root element!");
    const reactRoot = createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <EntryRoutes />
      </React.StrictMode>
    );
  });
}
entry();
