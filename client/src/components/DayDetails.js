import React, { useEffect, useState } from "react";

function DayDetails({ openaddEvent, user, date , setclickeddate_null, openForm, setShouldRefresh, shouldRefresh}) {
  const [events, setEvents] = useState([]);
  
  // let formattedDate = date.toISOString().split("T")[0];
  let formattedDate = date.toLocaleDateString("en-CA");
  let user_id = user.id
   // didnt work for my timezone so I changed to have local date
  // useEffect(() => {
  //   fetch(`http://127.0.0.1:5555/events/${formattedDate}`)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setEvents(data);
  //       console.log(data)
  //       setShouldRefresh(false)
  //     })
  //     .catch((error) => console.error("Error fetching events:", error));
  // }, [formattedDate, shouldRefresh]); 

  // function delete_event(eventId) {
  //   fetch(`http://127.0.0.1:5555/events/${eventId}`, {
  //     method: "DELETE",
  //   })
  //     .then((r) => r.json())
  //     .then((deletedEvent) => {
  //       setEvents((prevEvents) =>
  //         prevEvents.filter((event) => event.id !== deletedEvent.id)
  //       );
  //       setShouldRefresh(prev => !prev);
  //     })
  //     .catch((error) => console.error("Error deleting event:", error));
  // }
  // // I need to refresh to see it deleted need to be fixed

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
    <div className='day-box'>
      {/* <div className= 'day-box'> */}
      <button onClick={setclickeddate_null} id="exit-detail" className="interact-buttons">❌</button>
      <button onClick={openaddEvent} id="event-add" className="interact-buttons">➕</button>
      <h2>{new Date(date).toDateString()}</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, i) => (
            <li key={i}>
              {event.title} - {new Date(`${event.date}T${event.time}`).toLocaleTimeString() + " "}
              <button onClick={() => openForm(event.id)} id="edit" className="interact-buttons">✏️</button>
              <button onClick={() => delete_event(event.id)} className="interact-buttons">❌</button>
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
