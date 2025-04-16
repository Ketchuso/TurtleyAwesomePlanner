import React, { useEffect, useState } from "react";

function DayDetails({ openaddEvent, user, date , setclickeddate_null, openForm, setShouldRefresh, shouldRefresh}) {
  const [events, setEvents] = useState([]);
  
  // let formattedDate = date.toISOString().split("T")[0];
  let formattedDate = date.toLocaleDateString("en-CA");
  let user_id = user.id

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/calendar_event/${user_id}/${formattedDate}`)
      .then((resp) => resp.json())
      .then((data) => {
        setEvents(data);
        console.log(data)
        setShouldRefresh(false)
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [formattedDate, shouldRefresh, user_id, setShouldRefresh]); 

  function delete_event(eventId) {
    fetch(`http://127.0.0.1:5555/events/${eventId}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((deletedEvent) => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== deletedEvent.id)
        );
        setShouldRefresh(prev => !prev);
      })
      .catch((error) => console.error("Error deleting event:", error));
  }

  // const[isPinkDate, setPink]= useState(null)

  
  // useEffect(() => {
  //   if (!Array.isArray(events)) return;

  //   const pink = events.some(event =>
  //     Array.isArray(event.user_ids) &&
  //     event.user_ids.includes(1) &&
  //     event.user_ids.includes(2)
  //   );

  //   setPink(pink);
  // }, [events]);
  
 
  return (
    <div className='day-box task-container'>
      <div className="event-details">
      <button onClick={setclickeddate_null} id="exit-detail" className="interact-buttons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
      <button onClick={openaddEvent} id="event-add" className="interact-buttons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
      </div>
      <h2>{new Date(date).toDateString()}</h2>
      {events.length > 0 ? (
        <ul className="event-list">
          {events.map((event, i) => (
            <li key={i}>
              {event.title} - {new Date(`${event.date}T${event.time}`).toLocaleTimeString() + " "}
              <div className="event-details">
                <button onClick={() => openForm(event.id)} id="edit" className="interact-buttons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
                <button onClick={() => delete_event(event.id)} className="interact-buttons"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}
    </div>

  );
}

export default DayDetails;
