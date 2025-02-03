'use client';
import React, { useState } from 'react';
import SideBar from '../../layouts/Sidebar';
import Title from '../../layouts/Titlebar';
import dynamic from 'next/dynamic';

// Use dynamic imports to ensure client-side only rendering
const LeaveTypeSettings = dynamic(() => import('./LeaveTypeSettings'), { ssr: false });
const OrganizationDetails = dynamic(() => import('./OrganizationDetails'), { ssr: false });
const BranchDetails = dynamic(() => import('./BranchDetails'), { ssr: false });
const PayGradeSettings = dynamic(() => import('./PayGradeSettings'), { ssr: false });
const JobTitleSettings = dynamic(() => import('./JobTitleSettings'), { ssr: false });
const DepartmentsSettings = dynamic(() => import('./DepartmentsSettings'), { ssr: false });

const SettingsPage = () => {
  const [activeSetting, setActiveSetting] = useState('leaveType');

  const renderActiveSetting = () => {
    switch (activeSetting) {
      case 'leaveType':
        return <LeaveTypeSettings />;
      case 'organizationDetails':
        return <OrganizationDetails />;
      case 'branchDetails':
        return <BranchDetails />;
      case 'payGrade':
        return <PayGradeSettings />;
      case 'jobTitle':
        return <JobTitleSettings />;
      case 'departments':
        return <DepartmentsSettings />;
      default:
        return <p>Select a setting from the menu.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-700 p-8">
      <SideBar activePanel={5} />
      <div className="lg:ml-60 ">
        <Title />
        <div className="container mx-auto mt-8">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
            <h1 className="text-3xl font-semibold mb-4 text-blue-400">settings</h1>
            <div className="flex space-x-4 mb-8">
              <button
                className={`px-4 py-2 rounded-md ${activeSetting === 'leaveType' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveSetting('leaveType')}
              >
                Leave Type
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeSetting === 'organizationDetails' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveSetting('organizationDetails')}
              >
                Organization Details
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeSetting === 'branchDetails' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveSetting('branchDetails')}
              >
                Branch Details
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeSetting === 'payGrade' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveSetting('payGrade')}
              >
                Pay Grade
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeSetting === 'jobTitle' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveSetting('jobTitle')}
              >
                Job Title
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeSetting === 'departments' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveSetting('departments')}
              >
                Departments
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              {renderActiveSetting()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
