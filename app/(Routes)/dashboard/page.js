'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../layouts/Sidebar';
import classNames from 'classnames';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import HRManagerDashboard from './HRManagerDashboard';
import SupervisorDashboard from './SupervisorDashboard';
import User from '@/app/models/userModel';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tempRole = await User.getRole();
        setRole(tempRole);  
        setLoading(false);

      } catch (err) {
        setError(err);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const renderDashboard = () => {
    if (role === 'Admin') {
      return <AdminDashboard />;
    }
    else if (role === 'HR Manager') {
      return <HRManagerDashboard />;
    }
    else if (role === 'Supervisor') {
      return <SupervisorDashboard />;
    }
    else if (role === 'Employee') {
      return <EmployeeDashboard />;
    }
    else <div>No dashboard available for this role.</div>;
  };

  return (
        <>
          <SideBar activePanel={0}/>
          <div className="flex flex-col lg:ml-56 ">
            {renderDashboard()}
          </div>
        </>
  );
};

export default Dashboard;
