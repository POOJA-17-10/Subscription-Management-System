import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Admin/components/Header';
import Sidebar from './Admin/components/Sidebar';
import Footer from './Admin/components/Footer';

import Dashboard from './Admin/pages/Dashboard';
import SignUp from './SignUp';
import Login from './Login';
import Plans from './Admin/pages/Plans';
import Discounts from './Admin/pages/Discounts';
import Analytics from './Admin/pages/Analytics';
import Users from './Admin/pages/Users';
import Notifications from './Admin/pages/Notifications';
import Settings from './Admin/pages/Settings';

import './App.css';
import UserDashboard from './User/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <div className="container">
            <Sidebar />
            <div className="main-content">
              <Header />
              <div className="page-content">
                <Dashboard />
              </div>
              <Footer />
            </div>
          </div>
        } />
  <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/discounts" element={<Discounts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

