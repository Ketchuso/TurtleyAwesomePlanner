import React, {  useState } from "react";
function Add({user, clickedDate, addform_false, setShouldRefresh}){
    const[newtitle, setnewtitle]= useState('')
    const[newtime, setnewtime]=useState('')

  if (!clickedDate) return null;
  console.log('clickedDate:', clickedDate, 'newtime:', newtime);
  const formattedDate = clickedDate.toLocaleDateString("en-CA")

  function handleSubmit() {
    // First: create an event
    fetch(`http://127.0.0.1:5555/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newtitle,
        date: formattedDate,
        time: newtime + ":00",
      }),
    })
    .then((r) => r.json())
    .then((newEvent) => {
      console.log("Created event:", newEvent);

      // Second: create calendar_event(s) with the new event's ID
      return fetch(`http://127.0.0.1:5555/calendar_event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          event_id: newEvent.id
        }),
      });
    })
    .then((r) => r.json())
    .then((calendarEvent) => {
      console.log("Linked calendar_event:", calendarEvent);
      setShouldRefresh((prev) => !prev);
    })
    .catch((err) => {
      console.error("Error during event or calendar_event creation:", err);
    });
}


      return (
        <div className="event-form form-container">
          <h1 className="form-title">Add Event</h1>
          <button onClick={addform_false} id="exit-add" className="interact-buttons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
          <form className="form-container" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(clickedDate)
            }}>
            <label className="h2.form-title">
              Title:
              <input
                type="text"
                value={newtitle}
                onChange={(e) => setnewtitle(e.target.value)}
                placeholder="Enter title"
              />
            </label>
            <label className="h2.form-title">
              Time:
              <input
                type="text"
                value={newtime}
                onChange={(e) => setnewtime(e.target.value)}
                placeholder="Enter time (ex. 3:00) - 24 hour time"
              />
            </label>
    
            <button className="button-class"type="submit">Submit</button>
          </form>
        </div>
      );
    }
    
    export default Add;
    