'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../layouts/Sidebar';
import classNames from 'classnames';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import HRManagerDashboard from './HRManagerDashboard';
import SupervisorDashboard from './SupervisorDashboard';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/user', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Network or server issue');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const renderDashboard = () => {
    if (userData.role === 'Admin') {
      return <AdminDashboard />;
    }
    else if (userData.role === 'HR Manager') {
      return <HRManagerDashboard />;
    }
    else if (userData.role === 'Supervisor') {
      return <SupervisorDashboard />;
    }
    else if (userData.role === 'Employee') {
      return <EmployeeDashboard />;
    }
    else <div>No dashboard available for this role.</div>;
  };

  return (
    <div className={classNames(loading ? "hidden" : "block")}>
      {userData && (
        <>
          <SideBar activePanel={0} role = {userData.role} />
          <div className="flex flex-col lg:ml-56 ">
            {renderDashboard()}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
