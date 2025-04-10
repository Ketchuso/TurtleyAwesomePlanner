import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Calendar from "./Calendar";
import DayDetails from "./DayDetails";

function App() {
  const [clickedDate, setClickedDate] = useState(null)

  return (
    <div className="app">
      <Calendar onDateClick={setClickedDate} />
      {clickedDate && <DayDetails date={clickedDate} />}
    </div>
  );
}

export default App;
