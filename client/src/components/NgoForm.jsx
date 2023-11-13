import React, { useState } from 'react';
import { AWS_URL } from '../const';
import axios from 'axios';

const NgoForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    fieldOfWork: '',
    volunteerDays: '',
    phoneNumber: '',
    address: '',
    pinCode: '',
    description: '',
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic for form submission (e.g., API call, state update)
    console.log('Form Data:', formData);
    const volPostEndpoint = AWS_URL + "/add/ngo";
    try {
        const response = await axios.post(volPostEndpoint, JSON.stringify(formData), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    catch (err) {
        console.log(err);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h2>Enter NGO Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Field of Work:</label>
          <input
            type="text"
            name="fieldOfWork"
            value={formData.fieldOfWork}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Volunteer Days:</label>
          <input
            type="text"
            name="volunteerDays"
            value={formData.volunteerDays}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Num:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>PIN Code:</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NgoForm;
