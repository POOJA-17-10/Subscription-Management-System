import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/plans">Plans</NavLink>
        <NavLink to="/discounts">Discounts</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
        <NavLink to="/users">User Management</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
