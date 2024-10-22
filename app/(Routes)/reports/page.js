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
    <SideBar activePanel={0} role = {User.getRole} />
    <div className="ml-56"> 

      <Title/>
      <div className="">
        {/* Main content */}
        <section id="employee-by-department">
          <EmployeeByDepartment />
        </section>

        <section id="total-leaves">
          <TotalLeavesByDepartment />
        </section>

        <section id="employees-grouped">
          <EmployeesGrouped />
        </section>

        <section id="custom-fields">
          <CustomFieldsReport />
        </section>
      </div>
    </div>
    </>
  );
};

export default ReportPage;
