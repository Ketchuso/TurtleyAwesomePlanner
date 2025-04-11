import React, {  useState } from "react";
import Calendar from "./Calendar";
import DayDetails from "./DayDetails";
import Edit from "./Edit";
function App() {
  const [clickedDate, setClickedDate] = useState(null)
  const [editingEventId, setEditingEventId] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);


  function setClickedDate_null(){
    return setClickedDate(null)
  }
  
  function editform_false(){
    return seteditform(false)
  }
  const[editform, seteditform]= useState(false)

  // function setClickedDate_null(){
  //   return setClickedDate(null)
  // }
  function openForm(event_id){
    seteditform(true)
    setEditingEventId(event_id)
  }

  // function edit_event(eventId, updates) {
  //   fetch(`http://127.0.0.1:5555/events/${eventId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updates),
  //   })
  //     .then((r) => r.json())
  //     .then((updatedEvent) => {
  //       console.log("Updated event:", updatedEvent);
  //     });
  // }


  return (
    <div className="app">
      <Calendar onDateClick={setClickedDate} />
      {clickedDate && <DayDetails date={clickedDate} setclickeddate_null={setClickedDate_null} openForm={openForm} setShouldRefresh={setShouldRefresh} shouldRefresh={shouldRefresh}/>}
      {editform ? <Edit eventid={editingEventId} editform_false={editform_false} setShouldRefresh={setShouldRefresh}/> : ""}
      </div>
  );
}

// of clickDate is true render DayDetails
export default App;
