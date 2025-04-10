import React, { useEffect, useState } from "react";

function DayDetails({ date }) {
  const [events, setEvents] = useState([]);
  
  let formattedDate = date.toISOString().split("T")[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/events/${formattedDate}`)
      .then((resp) => resp.json())
      .then((data) => {
        setEvents(data);
        console.log(data)
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, [date]); 

  return (
    <div className="day-box">
      <h2>{new Date(date).toDateString()}</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event, i) => (
            <li key={i}>
              {event.title} - {new Date(`${event.date}T${event.time}`).toLocaleTimeString()}
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
