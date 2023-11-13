// Import necessary dependencies
import React, { useState } from 'react';

// Functional component for the Sign In page
const SignInPage = () => {
  // State to store user input (email and password)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here (e.g., API call, user context update)
    console.log('Email:', email, 'Password:', password);
    // Reset the form after submission (optional)
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
