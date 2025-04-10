import React, { useState } from "react";
import { Calendar as ReactCalendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';  // Make sure you import the default CSS for react-calendar

function Calendar() {
    const [date, setDate] = useState(new Date());
    const [clickedDate, setClickedDate] = useState(null)

    const dateClicked = (value) => {
        setClickedDate(value);
    }

    return (
        <div className="calendar-container">
            <h1 className="title">My Calendar</h1>
            <ReactCalendar
                onClickDay={dateClicked}
                onChange={setDate}
                value={date}
                className="custom-calendar"
            />
            {clickedDate && (
                <div className="day-box">
                    You clicked: {clickedDate.toDateString()}
                </div>
            )

            }
            <div className="calendar-tail" />
        </div>
    );
}

export default Calendar;
