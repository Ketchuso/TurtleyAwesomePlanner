import React from "react";

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
    );
  }

  return null;
}

export default NavBar;
