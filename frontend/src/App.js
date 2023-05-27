import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import EmailForm from './Compnents/EmailForm';
import OTPForm from './Compnents/OTPForm';
import Welcome from './Compnents/Welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<EmailForm/>}></Route>
        <Route path='/OTPForm/:id' exact element={<OTPForm/>}></Route>
        <Route path='/Welcome' exact element={<Welcome/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
