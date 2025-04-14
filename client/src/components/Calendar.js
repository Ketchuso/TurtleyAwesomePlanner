import React, { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';  // Make sure you import the default CSS for react-calendar

function Calendar({ onDateClick }) {
    const [date, setDate] = useState(new Date());


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
