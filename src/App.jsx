import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Work from './pages/Work';
import "./App.css"
import Setting from './pages/Setting';
import EditSport from './pages/EditSport';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="app" element={<Work />} />
          <Route path="app/settings" element={<Setting />} />
          <Route path="app/edit-sport" element={<EditSport />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
