import React, { useState } from 'react';
import axios from 'axios';
import { AWS_URL } from '../const';

const VolunteerForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    fieldOfInterest: '',
    availabilityDays: '',
    phoneNumber: '',
    address: '',
    pinCode: '',
    dateOfBirth: '',
    gender: '',
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic for form submission (e.g., API call, state update)
    console.log('Form Data:', formData);
    const volPostEndpoint = AWS_URL + "/add/volunteer";
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
      <h2>Enter Volunteer Information</h2>
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
          <label>Field Of Interest:</label>
          <input
            type="text"
            name="fieldOfInterest"
            value={formData.fieldOfInterest}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Availability Days:</label>
          <input
            type="text"
            name="availabilityDays"
            value={formData.availabilityDays}
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
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;
