'use client'
import { useState } from "react";
import EmployeeCreator from "./EmployeeCreator"; // Adjust the import path
import JobDetailsUpdater from "./JobDetailCreator"; // Adjust the import path
import Title from "@/app/layouts/Titlebar";
import SideBar from "@/app/layouts/Sidebar";
import AddDependent from "./addDependent";
import AddEmergencyPerson from "./AddEmergencyPerson"
import CreateUser from "./CreateUserAccount";

export default function EmployeeManagement() {
  const [task, settask] = useState(1);
  const [employee_id,setEmployeeId] = useState('row');

  const handleEmployeeCreationSuccess = (new_employee_id,newTask) => {
    settask(newTask);
    setEmployeeId(new_employee_id);
    console.log(new_employee_id);
  };

  const renderContent = () => {
    if (task === 1) {
      return <EmployeeCreator onSuccess={handleEmployeeCreationSuccess} />;
    } else if(task === 2) {
      return <JobDetailsUpdater employee_id={employee_id} onSuccess={handleEmployeeCreationSuccess}/>;
    } else if(task === 3 ) {
      return <CreateUser employee_id={employee_id} onSuccess={handleEmployeeCreationSuccess}/>
    } else if(task === 4) {
      return <AddEmergencyPerson employee_id={employee_id} onSuccess={handleEmployeeCreationSuccess}/>
    } else if(task === 5) {
      return <AddDependent employee_id={employee_id} onSuccess={handleEmployeeCreationSuccess} />
    }else{
      return <div>Invalid task</div>
    }
    
  }
  return (
    <>
      <SideBar/>
      <div className="ml-56">
       {renderContent()}
      </div>
    </>
  );
}
