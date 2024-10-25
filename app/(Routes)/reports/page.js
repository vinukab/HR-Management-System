'use client'
import EmployeeByDepartment from "./chartcomponent/EmployeeByDepartment";
import EmployeesGrouped from "./chartcomponent/EmployeesGrouped";
import CustomFieldsReport from "./chartcomponent/CustomReportsField";
import TotalLeavesByDepartment from "./chartcomponent/TotalLeavesByDepartment";
import SideBar from "../../layouts/Sidebar";
import User from "@/app/models/userModel";
import Title from "@/app/layouts/Titlebar";
//import Sidebar from "./chartcomponent/sidebar";

const ReportPage = () => {
  return (
    <>
    <SideBar activePanel={0}/>
    <div className="ml-56 flex flex-col gap-1"> 
      <Title/>
      <div className="flex gap-1">
          <section className="w-1/2" id="employee-by-department">
            <EmployeeByDepartment />
          </section>

          <section className="w-1/2" id="total-leaves">
            <TotalLeavesByDepartment />
          </section>
        </div>

        <div>
          <section id="custom-fields">
            <CustomFieldsReport />
          </section>
        </div>

        <div className="gap-1">
          <section className="w-1/2" id="employees-grouped">
            <EmployeesGrouped />
          </section>
        </div>
    </div>
    </>
  );
};

export default ReportPage;
