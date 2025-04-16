import React, { useState } from "react";
import Calendar from "./Calendar";
import DayDetails from "./DayDetails";
import Edit from "./Edit";
import Add from "./Add";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { user } = useOutletContext();
  const [clickedDate, setClickedDate] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [editform, seteditform] = useState(false);
  const [addevent, setaddevent] = useState(false);

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

  function openaddEvent() {
    setaddevent(true);
  }

  function addform_false() {
    setaddevent(false);
  }

  return (
    <>
      <Calendar
        onDateClick={setClickedDate}
        user={user}
        setShouldRefresh={setShouldRefresh}
        shouldRefresh={shouldRefresh}
      />
      {clickedDate && (
        <DayDetails
          date={clickedDate}
          setclickeddate_null={setClickedDate_null}
          openForm={openForm}
          setShouldRefresh={setShouldRefresh}
          shouldRefresh={shouldRefresh}
          user={user}
          openaddEvent={openaddEvent}
        />
      )}
      {editform && (
        <Edit
          eventid={editingEventId}
          editform_false={editform_false}
          setShouldRefresh={setShouldRefresh}
        />
      )}
      {addevent && (
        <Add
          addform_false={addform_false}
          setShouldRefresh={setShouldRefresh}
          clickedDate={clickedDate}
          user={user}
        />
      )}
    </>
  );
}

export default Home;