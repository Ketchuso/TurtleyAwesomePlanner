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
    <div style={{
        border: "2px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "400px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ marginBottom: "10px", textAlign: "center" }}>Today's Tasks</h2>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{task.title} {task.time}</span>
                {task.finished ? (
                  <button onClick={() => handleClick(task.id)}>☑️</button>
                ) : (
                  <button onClick={() => handleClick(task.id)}>◻️</button>
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
