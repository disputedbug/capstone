import React, { useState } from 'react';
import VolunteerForm from './VolunteerForm';
import NgoForm from './NgoForm';

const onSubmitHander = () => {

}

const SignUpForm = () => {
  const [signUpAs, setSignUpAs] = useState(''); // State to track selected option

  const handleSignUpChange = (e) => {
    setSignUpAs(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div class="signup">
      <h2>Sign Up</h2>
      <div>
        <div>
          <label>Sign up as:</label>
          <select value={signUpAs} onChange={handleSignUpChange} required>
            <option value="" disabled>Select</option>
            <option value="ngo">NGO</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {/* Other fields can be added here */}
      </div>
      {
        signUpAs === 'volunteer' ? <VolunteerForm /> : <NgoForm />
      }
    </div>
  );
};

export default SignUpForm;
