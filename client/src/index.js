import React from "react";
import App from "./components/App";
import Friend from "./components/Friend";
import Join from "./components/Join";
import Home from "./components/Home";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />, // layout
      children: [
        {
          path: "/", // this is the calendar page
          element: <Home />,
        },
        {
          path: "/Friend",
          element: <Friend />,
        },
        {
          path: "/Join",
          element: <Join />,
        },
      ],
    },
  ]);


const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
