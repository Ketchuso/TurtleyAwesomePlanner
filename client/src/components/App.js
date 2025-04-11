import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import DayDetails from "./DayDetails";
import Edit from "./Edit";
import Login from "../pages/Login";

function App() {
  const [user, setUser] = useState(null);
  const [clickedDate, setClickedDate] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [editform, seteditform] = useState(false);

  useEffect(() => {
    fetch("/check_session",{ credentials: "include" }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function setClickedDate_null() {
    setClickedDate(null);
  }

  function editform_false() {
    seteditform(false);
  }

  function openForm(event_id) {
    seteditform(true);
    setEditingEventId(event_id);
  }

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <Calendar onDateClick={setClickedDate} />
          {clickedDate && (
            <DayDetails
              date={clickedDate}
              setclickeddate_null={setClickedDate_null}
              openForm={openForm}
              setShouldRefresh={setShouldRefresh}
              shouldRefresh={shouldRefresh}
            />
          )}
          {editform && (
            <Edit
              eventid={editingEventId}
              editform_false={editform_false}
              setShouldRefresh={setShouldRefresh}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App