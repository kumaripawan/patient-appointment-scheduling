import React from 'react';
import './App.css';

function App() {
  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch('http://127.0.0.1:5000/add_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert(data.message);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        window.location.href = '/dashboard';
      } else {
        alert('Login failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };

  return (
    <div>
      <header className="header">
        <h1>Welcome to the Patient Appointment Scheduling Dashboard</h1>
        <p>Your one-stop solution for managing appointments efficiently and securely.</p>
      </header>

      <div className="flexbox">
        <div className="feature" onClick={() => window.location.href = 'scheduling.html'}>
          <h3>Easy Appointment Scheduling</h3>
          <p>Book appointments with just a few clicks, no hassle involved.</p>
        </div>
        <div className="feature" onClick={() => window.location.href = 'notifications.html'}>
          <h3>Automated Notifications</h3>
          <p>Receive timely reminders for all your appointments.</p>
        </div>
        <div className="feature" onClick={() => window.location.href = 'security.html'}>
          <h3>Secure Login & Registration</h3>
          <p>Your data is safe with our top-notch security measures.</p>
        </div>
        <div className="feature" onClick={() => window.location.href = 'dashboard.html'}>
          <h3>User Dashboard</h3>
          <p>Manage all your appointments in one convenient location.</p>
        </div>
      </div>

      <div className="container">
        <h2>Login</h2>
        <form id="loginForm" onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Enter your email" />
          <input type="password" name="password" placeholder="Enter your password" />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="container">
        <h2>Register</h2>
        <form id="registerForm" onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Enter your name" required />
          <input type="email" name="email" placeholder="Enter your email" required />
          <input type="password" name="password" placeholder="Enter your password" required />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;
