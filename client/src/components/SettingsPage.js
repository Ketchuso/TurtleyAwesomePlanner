import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { id } = useParams();

  useEffect(() => {
    console.log(id); // This should print the actual user ID in the console
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    try {
      fetch(`/users/${id}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
        }),
      })
      .then((r) => {
        if (r.ok) {
          alert("Info Updated Successfully");
        } else {
          alert("Update failed.");
        }
      })
      .catch(error => {
        console.error("Update error:", error);
        alert("An error occurred.");
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 id="settings">Settings</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Update your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />

          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Update your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input 
            type="password" 
            id="passwordConfirmation" 
            placeholder="Confirm your password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
          />

          <button id="save-settings" className="button-class" type="submit">
            Save Settings
          </button>
        </form>
      </div>
    </>
  );
};

export default SettingsPage;
