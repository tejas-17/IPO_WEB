import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders App component', () => {
    const { queryAllByText } = render(<App />);

    const headerElements = queryAllByText(/IPO DASHBOARD/i);
    expect(headerElements.length).toBeGreaterThan(0);

    // Check if at least one element with the text "Register" is present
    const registerButtons = queryAllByText(/Register/i);
    expect(registerButtons.length).toBeGreaterThan(0);
  });

  test('registers a new user and logins into the dashboard', () => {
    const { queryAllByText, getByLabelText, getByRole } = render(<App />);
    const registerButtons = queryAllByText(/Register/i);
    fireEvent.click(registerButtons[0]);

    const usernameInput = getByLabelText(/New Username/i);
    const passwordInput = getByLabelText(/New Password/i);
    const registerSubmitButton = getByRole('button', { name: /Register/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(registerSubmitButton);

    const dashboardElements = queryAllByText(/Dashboard/i);
    expect(dashboardElements.length).toBeGreaterThan(0);

    const upcomingElements = queryAllByText(/Upcoming IPOs/i);
    expect(upcomingElements.length).toBeGreaterThan(0);

    const forexElements = queryAllByText(/Foreign Exchange Rates/i);
    expect(forexElements.length).toBeGreaterThan(0);



    // Add assertions based on your expected behavior after registration

    const logout = getByRole('button', { name: /Logout/i });
    fireEvent.click(logout);

    const headerElements2 = queryAllByText(/IPO DASHBOARD/i);

    expect(headerElements2.length).toBeGreaterThan(0);


  });

  // Add more test cases based on your application logic
});
