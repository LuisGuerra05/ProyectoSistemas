// src/components/AuthLayout.js
import React from 'react';

function AuthLayout({ children }) {
  return (
    <div className="page-container">
      <div className="page-content">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
