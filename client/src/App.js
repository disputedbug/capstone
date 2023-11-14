import logo from './logo.svg';
import './App.css';
import SignInPage from './components/SignInPage';
import VolunteerForm from './components/VolunteerForm';
import NgoForm from './components/NgoForm';
import NGO_Volunteer_Match from './components/NGO_Volunteer_Match';
import SignUpForm from './components/SignUpForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<SignUpForm />} />
      <Route path="/match" element={<NGO_Volunteer_Match />} />
      <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
