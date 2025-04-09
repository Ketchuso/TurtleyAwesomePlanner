import React, { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';  // Make sure you import the default CSS for react-calendar

function Calendar() {
    const [date, setDate] = useState(new Date());

    return (
        <div className="calendar-container">
            <h1 className="title">My Calendar</h1>
            <ReactCalendar
                onChange={setDate}
                value={date}
                className="custom-calendar"
            />
            <div className="calendar-tail" />
        </div>
    );
}

export default Calendar;
