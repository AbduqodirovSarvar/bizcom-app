import React, { useState } from 'react';
import '../styles/loginApp.css';

const LoginApp = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      phone: phone
    };

    console.log(data);

    try {
      const response = await fetch('https://localhost:7220/api/Auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const fetchedData = await response.json();
        console.log(fetchedData.token);
        localStorage.setItem('token', fetchedData.token);
        // Handle success or navigate to the next page
      } else {
        // Handle error response
        console.error('Login failed.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred during login.', error);
    }
  };

  return (
    <div className="App">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="password"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <button type="submit">Login</button>
        <h5>
          If you don't have an account: <a href="https://www.w3schools.com/bootstrap/bootstrap_get_started.asp">Register</a>
        </h5>
      </form>
    </div>
  );
};

export default LoginApp;