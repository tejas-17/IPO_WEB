// Registration.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';

const Registration = ({ onRegistration }) => {
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isWeakPassword, setIsWeakPassword] = useState(false);

  const isPasswordStrong = (password) => {
    // Replace this with your actual password strength logic
    // For simplicity, let's assume a minimum length of 8 characters
    return password.length >= 8;
  };

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    setIsUsernameTaken(false);
    setIsWeakPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty username or password
    if (!newUser.username || !newUser.password) {
      alert('fields cannot be empty')
      return;
    }

    // Check if the password is strong
    if (!isPasswordStrong(newUser.password)) {
      setIsWeakPassword(true);
      return;
    }

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
      {isWeakPassword && (
        <p style={{ color: 'red', marginBottom: '10px' }}>Password is too weak. Choose a stronger password.</p>
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
        <small className="text-muted" style={{ fontSize:15,color: 'black',backgroundColor:'white' }}>
          Password must be at least 8 characters long and include a mix of uppercase, lowercase, and numbers.
        </small>
        <div className="password-strength-indicator" style={{ color: 'white' }}>
          Password Strength: {isPasswordStrong(newUser.password) ? 'Strong' : 'Weak'}
        </div>
      </div>
      <button type="submit" style={{ color: 'white' }} className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default Registration;
