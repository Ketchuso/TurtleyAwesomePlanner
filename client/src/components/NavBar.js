import React from "react";
import { NavLink } from "react-router-dom";


function NavBar({ setUser, user }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  if (user) {
    return (
      <>
       <nav>
        <button
          id="logout"
          className="button-class logout"
          variant="outline"
          onClick={handleLogoutClick}
        >
          Logout
        </button>
       </nav>

       <nav className="nav-container">
          <NavLink
            to="/"
            className="nav-text">
            My Calendar
          </NavLink>
        </nav>
        <nav className="nav-container">
        <NavLink
          to="/Friend"
          className="nav-text"
        >
          Friend's Calendar
        </NavLink>
        </nav>
        <nav className="nav-container">
        <NavLink
          to="/Join"
          className="nav-text"
        >
          Joined Calendar
        </NavLink>
        </nav>


      </>
     
    );
  }

  return null;
}

export default NavBar;
