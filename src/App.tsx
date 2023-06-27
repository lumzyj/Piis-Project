import React from 'react';
import './App.css';
import Signup from './component/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import Transfer from './component/Transfer/Transfer';
import Transaction from './component/Transaction/Transaction';
import CreateUser from './component/User';




function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/transaction" element={<Transaction />} />

      </Routes>
    </Router>
  );
}

export default App;


