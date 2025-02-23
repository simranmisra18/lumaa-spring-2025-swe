import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Tasks from './components/Tasks';
import Register from './components/Register';
import Login from './components/Login';

const App: React.FC = () => {
  return (
      <Router>
        <div>
            <h1><center>Task Manager</center></h1>
          <Routes>
              <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;

