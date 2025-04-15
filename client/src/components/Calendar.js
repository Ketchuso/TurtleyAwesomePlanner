import React, { useState , useEffect} from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';  // Make sure you import the default CSS for react-calendar

function Calendar({ onDateClick , user, setShouldRefresh, shouldRefresh}) {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
      
      // let formattedDate = date.toLocaleDateString("en-CA");
      let user_id = user.id
    
      useEffect(() => {
        fetch(`http://127.0.0.1:5555/calendar_event/user/${user_id}`)
          .then((resp) => resp.json())
          .then((data) => {
            setEvents(data);
            console.log(data)
            setShouldRefresh(false)
          })
          .catch((error) => console.error("Error fetching events:", error));
      }, [ shouldRefresh, user_id, setShouldRefresh]); 
    
      const hasEventDates = events.map(event =>
        new Date(event.date).toLocaleDateString("en-CA")
      );

      console.log(hasEventDates); // <-- Add this line

      
    return (
      <>
        <h1 className="title">My Calendar</h1>
        <div className="calendar-container">
          
          <ReactCalendar
            onClickDay={(value) => {
              setDate(value);
              onDateClick(value); // ← Send clicked date to App.js
            }}
            value={date}
            className="custom-calendar"
            tileContent={({ date, view }) => {
              const formatted = date.toLocaleDateString("en-CA");
              console.log("Checking date:", formatted);
              if (view === "month" && hasEventDates.includes(formatted)) {
                console.log("Event found for date:", formatted);
                return <div className="event-dot" />;
              }
              return null;
            }}
          />

          <div className="calendar-tail" />

          <div className="turtle-head">
            <div className="left-eye"></div>
            <div className="right-eye"></div>
          </div>




          
        </div>
      </>
      );
}

export default Calendar;
