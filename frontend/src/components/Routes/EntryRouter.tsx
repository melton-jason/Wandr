import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "../MainPage";

const entryRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

export function EntryRoutes(): JSX.Element {
  return <RouterProvider router={entryRoutes} />;
}
