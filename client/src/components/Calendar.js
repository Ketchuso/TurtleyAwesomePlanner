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
    
      const hasEventDates = events.map(event => event.date);

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
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const formatted = `${year}-${month}-${day}`;
            
              if (view === "month" && hasEventDates.includes(formatted)) {
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
