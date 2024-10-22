import EmployeeByDepartment from "./chartcomponent/EmployeeByDepartment";
import EmployeesGrouped from "./chartcomponent/EmployeesGrouped";
import CustomFieldsReport from "./chartcomponent/CustomReportsField";
import TotalLeavesByDepartment from "./chartcomponent/TotalLeavesByDepartment";
//import Sidebar from "./chartcomponent/sidebar";

const ReportPage = () => {
  return (
    <div style={{ backgroundColor: "#121212", display: "flex" }}>
      {/* <Sidebar /> Sticky sidebar */}
      
      <div style={{ marginLeft: '220px', padding: '20px', width: '80%' }}> {/* Main content */}
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
  );
};

export default ReportPage;
