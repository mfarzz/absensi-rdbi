import React, { useState } from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/registration";
import Login from "./components/login";

function App() {
  return (
    <Router>
      <div>
        <h1>JWT Authentication with React</h1>
        <Routes>
          <Route path="/auth/register" element={<Registration />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
