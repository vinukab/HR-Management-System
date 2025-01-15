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
  const [totalEmployees] = useState(500);
  const [totalLeaves] = useState(320);

  return (
    <>
      <SideBar activePanel={0} role={User.getRole} />
      <div className="ml-56 bg-gray-700 text-gray-200 min-h-screen p-5">
        <Title />

        <div className="widgets-row flex gap-1 mb-5">
          <div className="widget bg-gray-800 text-gray-200 p-5 rounded-2xl shadow-md min-h-[80px] transition-shadow duration-300 hover:shadow-lg flex flex-col items-start">
            <h3 className="text-lg mb-[-10px] text-left">Total Employees</h3>
            <div className="progress-bar bg-gray-800 rounded-md w-full h-2 mt-2 overflow-hidden">
              <div
                className="progress-bar-fill bg-green-600 h-full transition-all duration-400"
                style={{ width: `${(totalEmployees / 1000) * 100}%` }}
              ></div>
            </div>
            <p className="text-2xl mt-2 font-bold text-left">{totalEmployees}</p>
          </div>

          

          <div className="widget bg-gray-800 text-gray-200 p-5 rounded-2xl shadow-md min-h-[80px] transition-shadow duration-300 hover:shadow-lg flex flex-col items-start">
            <h3 className="text-lg mb-[-10px] text-left">Total Leaves Taken</h3>
            <div className="progress-bar bg-gray-900 rounded-md w-full h-2 mt-2 overflow-hidden">
              <div
                className="progress-bar-fill bg-green-600 h-full transition-all duration-400"
                style={{ width: `${(totalLeaves / 500) * 100}%` }}
              ></div>
            </div>
            <p className="text-2xl mt-2 font-bold text-left">{totalLeaves}</p>
          </div>
        </div>

        

        <div className="space-y-5 ">
          <div className="flex h-96  space-x-2 ">
            <section
              id="employee-by-department"
              className="p-1.5 rounded-lg flex-grow h-full "
            >
              <EmployeeByDepartment />
            </section>

            <section
              id="total-leaves"
              className="w-1/3 h-full  p-1.5 rounded-lg "
            >
              <TotalLeavesByDepartment />
            </section>
          </div>

          <section
            id="custom-fields"
            className=" p-1.5 rounded-lg  flex-grow h-full"
          >
            <CustomFieldsReport />
          </section>

          <section
            id="employees-grouped"
            className=" p-1.5 rounded-lg flex-grow h-full"
          >
            <EmployeesGrouped />
          </section>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
