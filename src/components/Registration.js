// Registration.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Registration.css'; // Import your custom CSS

const Registration = ({ onRegistration }) => {
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    setIsUsernameTaken(false); // Reset the username taken state when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username is already taken
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const isTaken = storedUsers.some((user) => user.username === newUser.username);

    if (isTaken) {
      setIsUsernameTaken(true);
    } else {
      // Proceed with registration
      storedUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
      onRegistration(newUser);
      // Optionally, you can clear the form fields after registration
      setNewUser({ username: '', password: '' });
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      {isUsernameTaken && (
        <p style={{ color: 'red', marginBottom: '10px' }}>Username is already taken. Please choose another.</p>
      )}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          New Username:
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          New Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" style={{ color: 'white' }} className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default Registration;
