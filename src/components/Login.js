// Login.js
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    // Check if either username or password is empty
    if (!username || !password) {
      // Display an alert or set an error state to handle empty fields
      setShowAlert(true);
      return;
    }

    // Check if the user is admin
    if (username === 'admin' && password === 'admin') {
      onLogin(username, password);
      // Reset form fields
      setUsername('');
      setPassword('');
      // Hide any existing alert
      setShowAlert(false);
    } else {
      // User is not admin, check if the user is registered
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      const existingUser = storedUsers.find((user) => user.username === username && user.password === password);

      if (existingUser) {
        // User is registered, proceed with login
        onLogin(username, password);
        // Reset form fields
        setUsername('');
        setPassword('');
        // Hide any existing alert
        setShowAlert(false);
      } else {
        // User is not registered or credentials are incorrect, show alert
        setShowAlert(true);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Form className="login-form">
            <h2>Login</h2>
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <p>Invalid username or password. Please try again.</p>
              </Alert>
            )}
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
