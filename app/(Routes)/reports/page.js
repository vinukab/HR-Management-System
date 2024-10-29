'use client';
import { useState } from "react";
import EmployeeByDepartment from "./chartcomponent/EmployeeByDepartment";
import EmployeesGrouped from "./chartcomponent/EmployeesGrouped";
import CustomFieldsReport from "./chartcomponent/CustomReportsField";
import TotalLeavesByDepartment from "./chartcomponent/TotalLeavesByDepartment";
import SideBar from "../../layouts/Sidebar";
import User from "@/app/models/userModel";
import Title from "@/app/layouts/Titlebar";


const ReportPage = () => {
  // State for widget values
  const [totalEmployees] = useState(500);  // Number of employees
  const [totalLeaves] = useState(320);     // Number of leaves taken

  return (
    <>
      <SideBar activePanel={0} role={User.getRole} />
      <div className="ml-56"> 
        <Title />
        
        <div className="widgets-row flex gap-2 mb-5">
          <div className="widget bg-[#C4DAD2] text-black p-5 rounded-2xl shadow-md min-h-[80px] transition-shadow duration-300 hover:shadow-lg flex flex-col items-start">
            <h3 className="text-lg mb-[-10px] text-left">Total Employees</h3>
            {/* Progress bar */}
            <div className="progress-bar bg-[#E9EFEC] rounded-md w-full h-2 mt-2 overflow-hidden">
              <div 
                className="progress-bar-fill bg-[#16423C] h-full transition-all duration-400" 
                style={{ width: `${(totalEmployees / 1000) * 100}%` }} 
              ></div>
            </div>
            <p className="text-2xl mt-2 font-bold text-left">{totalEmployees}</p>
          </div>
          
          <div className="widget bg-[#C4DAD2] text-black p-5 rounded-2xl shadow-md min-h-[80px] transition-shadow duration-300 hover:shadow-lg flex flex-col items-start">
            <h3 className="text-lg mb-[-10px] text-left">Total Leaves Taken</h3>
            {/* Progress bar */}
            <div className="progress-bar bg-[#E9EFEC] rounded-md w-full h-2 mt-2 overflow-hidden">
              <div 
                className="progress-bar-fill bg-[#16423C] h-full transition-all duration-400" 
                style={{ width: `${(totalLeaves / 500) * 100}%` }} 
              ></div>
            </div>
            <p className="text-2xl mt-2 font-bold text-left">{totalLeaves}</p>
          </div>
        </div>

        <div>
          <div className="flex h-96 shadow-lg">

            <section id="employee-by-department"  className=" p-1.5 rounded-lg bg-white flex-grow h-full">
              <EmployeeByDepartment />
            </section>

            <section id="total-leaves" className="w-1/3 h-full p-1.5">
            <TotalLeavesByDepartment />
            </section>

          </div>

          <section id="custom-fields" className="shadow-lg p-1.5 rounded-lg bg-white flex-grow h-full">
            <CustomFieldsReport />
          </section>
         
          <section id="employees-grouped" className="shadow-lg p-1.5 rounded-lg bg-white flex-grow h-full">
            <EmployeesGrouped />
          </section>  
        </div>
        {/* <section id="employees-details" className="shadow-lg p-2 rounded-lg bg-white flex-grow h-full">
            <EmployeeDetails />
        </section>  */}
      </div>
    </>
  );
};

export default ReportPage;
