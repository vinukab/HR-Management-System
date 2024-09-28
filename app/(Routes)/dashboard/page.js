'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../(Components)/(Layout)/Sidebar';
import classNames from 'classnames';
import ContentPanel from './ContentPanel';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activePanel, setActivePanel] = useState(0);
  /* 0: Dashboard
     1: Employee Management
     2: Attendence
     3: Leave
     4: Reports
     5: Settings
  */

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

  return (
    <div className={classNames(loading ? "hidden" : "block")}>
      {userData && (
        <>
          <SideBar activePanel= {activePanel} setActivePanel= {setActivePanel} />
          <div className="flex flex-col ml-56">
            <ContentPanel activePanel={activePanel}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
