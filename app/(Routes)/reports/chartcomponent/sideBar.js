"use client";
import React from 'react';

const sidebar = () => {
  return (
    <div style={{ 
      backgroundColor: '#1E1E1E', 
      width: '500px', 
      height: '100vh', 
      padding: '20px', 
      color: '#FFFFFF', 
      position: 'sticky', 
      top: 0 
    }}>
      <h2>Reports</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <a href="#employee-by-department" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Employee by Department
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="#total-leaves" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Total Leaves by Department
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="#employees-grouped" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Employees Grouped
          </a>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <a href="#custom-fields" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
            Custom Fields Report
          </a>
        </li>
      </ul>
    </div>
  );
};

export default sidebar;
