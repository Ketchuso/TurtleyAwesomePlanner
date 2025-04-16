import React, {  useState } from "react";
function Edit({eventid, editform_false, setShouldRefresh}){
    const[newtitle, setnewtitle]= useState('')
    const[newdate, setnewdate]=useState('')
    const[newtime, setnewtime]=useState('')

    function handleSubmit(eventId) {
        fetch(`http://127.0.0.1:5555/events/${eventId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newtitle,
            date: newdate,
            time: newtime+":00"
          }),
        })
          .then((r) => r.json())
          .then((updatedEvent) => {
            console.log("Updated event:", updatedEvent);
            setShouldRefresh(prev => !prev)
          });
      }

      return (
        <div className="event-form form-container">
          <h1 className="form-title">Edit Event</h1>
          <button onClick={editform_false} id="edit-exit" className="interact-buttons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
          <form className="form-container" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(eventid)
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
              Date:
              <input
                type="text"
                value={newdate}
                onChange={(e) => setnewdate(e.target.value)}
                placeholder="Enter date (etc. 2025-01-01)"
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
    
            <button className="button-class" type="submit">Submit</button>
          </form>
        </div>
      );
    }
    
    export default Edit;
    