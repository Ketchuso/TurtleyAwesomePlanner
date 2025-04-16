import React from "react";
import App from "./components/App";
import Task from "./components/Task";
import Home from "./components/Home";
import SettingsPage from "./components/SettingsPage";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />, // layout with NavBar
      children: [
        {
          path: "/", // calendar/home
          element: <Home />,
        },
        {
          path: "/Task",
          element: <Task />,
        },
        {
          path: "/Settings/:id", // move SettingsPage in here
          element: <SettingsPage />,
        },
      ],
    },
  ]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<RouterProvider router={router} />);
