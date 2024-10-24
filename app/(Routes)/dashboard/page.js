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
<<<<<<< HEAD

=======
>>>>>>> 08fdf044b9f2da1fa9c4baf21a804fbac93dfa85
const Dashboard = () => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  if(!User.isLoggedin()){
    router.push('/login');
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const tempUsername = await User.getUsername();
        const tempRole = await User.getRole();
        const tempEmployeeId = await User.getEmployeeId();
    
        setUsername(tempUsername);
        setRole(tempRole);  
        setEmployeeId(tempEmployeeId);
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
    <div className={classNames(loading ? "hidden" : "block")}>
      {username && (
        <>
          <SideBar activePanel={0} role = {role} />
          <div className="flex flex-col lg:ml-56 ">
            {renderDashboard()}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
