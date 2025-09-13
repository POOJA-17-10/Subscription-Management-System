import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Admin/components/Header';
import Sidebar from './Admin/components/Sidebar';
import Footer from './Admin/components/Footer';

import Dashboard from './Admin/pages/Dashboard';
import Plans from './Admin/pages/Plans';
import Discounts from './Admin/pages/Discounts';
import Analytics from './Admin/pages/Analytics';
import Users from './Admin/pages/Users';
import Notifications from './Admin/pages/Notifications';
import Settings from './Admin/pages/Settings';

import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">

          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
