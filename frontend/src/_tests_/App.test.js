import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to React/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders the login component', () => {
  render(<App />);
  const loginElement = screen.getByText(/Login/i);
  expect(loginElement).toBeInTheDocument();
});

test('renders the register component', () => {
  render(<App />);
  const registerElement = screen.getByText(/Register/i);
  expect(registerElement).toBeInTheDocument();
});

test('renders the dashboard component', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
