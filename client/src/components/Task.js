import React, { useState, useEffect } from "react";

function Task() {

   const [user, setUser] = useState(null);
   const [tasks, setTasks] = useState([]);

  
   useEffect(() => {
      fetch("/check_session", { credentials: "include" }).then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);


    

   useEffect(() => {

    if (!user) return;

    const today = new Date().toISOString().split("T")[0];

    fetch(`http://localhost:5555/calendar_event/${user.id}/${today}`)
      .then((res) => res.json())
      .then((data) => {
        const tasksWithStatus = data.map((task) => ({
            ...task,
            finished: false,
          }));
          setTasks(tasksWithStatus);
      })
      .catch((err) => console.error("Error fetching today's events:", err));
  }, [user]);

  console.log("this is :",tasks)

  function handleClick(taskid){
    setTasks((tasks)=>tasks.map((task)=> task.id===taskid ? {...task, finished:!task.finished}: task))
  }



  return (
    <div className="task-container">
        <h2 style={{ marginBottom: "10px", textAlign: "center" }}>Today's Tasks</h2>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{task.title} @ {task.time}</span>
                {!task.finished ? (
                  <button className="check-box" onClick={() => handleClick(task.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg></button>
                ) : (
                  <button className="check-box" onClick={() => handleClick(task.id)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg></button>
                )}
              </li>
            ))
          ) : (
            <li>No tasks for today</li>
          )}
        </ul>
      </div>
      
  );
}

export default Task;
