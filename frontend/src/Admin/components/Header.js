import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-title">Admin Dashboard</div>
      <div className="header-actions">
        <button>Notifications</button>
        <button>Profile</button>
        <button>Logout</button>
      </div>
    </header>
  );
}

export default Header;
