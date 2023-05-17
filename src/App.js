import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [username, setUsername] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Validation rules
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name || !nameRegex.test(formData.name)) {
      errors.name = "User name shouldn't include any special character";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Please enter your date of birth';
    }

    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      // Submit the form or perform any other action
      const extractedUsername = formData.name.split(' ')[0]; // Extracting the first word as the username
      setUsername(extractedUsername);
      console.log('Username:', extractedUsername);

      // Reset the form
      setFormData({
        name: '',
        email: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
      });
      setValidationErrors({});
    }
  };

  return (
    <div className='body'><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <center><h2> Validation Form</h2></center>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {validationErrors.name && <span className="error">{validationErrors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {validationErrors.email && <span className="error">{validationErrors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        {validationErrors.dateOfBirth && (
          <span className="error">{validationErrors.dateOfBirth}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {validationErrors.password && <span className="error">{validationErrors.password}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {validationErrors.confirmPassword && (
          <span className="error">{validationErrors.confirmPassword}</span>
        )}
      </div>

      <button type="submit">Register</button>

      {username && <h2>User Name: {username}</h2>}
    </form></div>
  );
};

export default App;