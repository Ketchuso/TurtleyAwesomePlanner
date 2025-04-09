import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Calendar from "./Calendar";
import DayDetails from "./DayDetails";

function App() {
  return (
    <div>
      <Calendar/>
    </div>
  )
}

export default App;
