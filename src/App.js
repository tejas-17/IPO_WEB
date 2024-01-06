// App.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import IPOCard from './IPOCard';
import ExchangeRatesTable from './components/ExchangeRateTable';
import Registration from './components/Registration';
import Login from './components/Login';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [user, setUser] = useState(null);
  const [ipoData, setIpoData] = useState([]);
  const [forexRates, setForexRates] = useState([]);
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(true);

  useEffect(() => {
    // Fetch IPO and forex rate data on component mount
    fetchIPOData();
    fetchForexRates();
  }, []);

  const handleLogin = (username, password) => {
    // Implement your authentication logic here
    // For simplicity, let's assume any non-empty username/password is valid
    if (username && password) {
      const newUser = { username };
      setUser(newUser);
      // Clear login inputs
      setLoginUsername('');
      setLoginPassword('');
      // Hide login and register forms after successful login
      setShowLogin(false);
      setShowRegister(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic and reset user state
    setUser(null);
    // Show login and register forms after logout
    setShowLogin(true);
    setShowRegister(true);
  };

  const handleRegistration = (newUser) => {
    // Implement user registration logic here
    setUser(newUser);
    // Optionally, you can clear the form fields after registration
    setLoginUsername('');
    setLoginPassword('');
    // Hide login and register forms after successful registration
    setShowLogin(false);
    setShowRegister(false);
  };

  const fetchIPOData = async () => {
    try {
      // Replace with your actual API endpoint and token
      const response = await fetch('https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_783dcc2169924a7a9f17a4b0b13bca6c');
      const data = await response.json();
      setIpoData(data);
    } catch (error) {
      console.error('Error fetching IPO data:', error);
    }
  };

  const fetchForexRates = async () => {
    try {
      // Replace with your actual API endpoint and token
      const response = await fetch('https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_783dcc2169924a7a9f17a4b0b13bca6c');
      const data = await response.json();
      setForexRates(data);
    } catch (error) {
      console.error('Error fetching forex rates:', error);
    }
  };

  const handleCardClick = (ipo) => {
    setSelectedIPO(ipo);
  };

  return (
    <div className="app">
<h1 style={{ textAlign: "center" }}>IPO DASHBOARD</h1>
      {user && (
        <header className="dashboard-header">
          <Container>
            <Row className="justify-content-between align-items-center">
              <Col>
                <h1>Dashboard</h1>
                {user && <p>Welcome, {user.username}!</p>}
              </Col>
              <Col className="text-right">
                {user ? (
                  <Button variant="light" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  showLogin && (
                    <Button variant="light" onClick={() => setShowLogin(true)}  className="ml-auto">
                      Login
                    </Button>
                  )
                )}
              </Col>
            </Row>
          </Container>
        </header>
      )}
      <main>
        {user ? (
          <div className="dashboard">
            <div className="column">
              <div className="calendar-container">
                <Calendar style={{ background: '#fff', color: 'red' }} />
              </div>
              
            </div>
            <div className="ipo-list">
              <h2>Upcoming IPOs</h2>
              <div className="ipo-cards-container">
                {ipoData.map((ipo) => (
                  <IPOCard key={ipo.symbol} ipo={ipo} onCardClick={handleCardClick} />
                ))}
              </div>
            </div>
            <div className="forex-rates">
                
                <ExchangeRatesTable rates={forexRates} />
              </div>
          </div>
        ) : (
          <div className="landing-page-container">
            {/* <div className="login-container"> */}
              
              <Login onLogin={handleLogin} />
            {/* </div> */}
            <div className="registration-container">
              <h2>Register</h2>
              {showRegister && <Registration onRegistration={handleRegistration} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
