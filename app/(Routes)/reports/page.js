import EmployeeByDepartment from "./chartcomponent/EmployeeByDepartment";
import EmployeesGrouped from "./chartcomponent/EmployeesGrouped";
import CustomFieldsReport from "./chartcomponent/CustomReportsField";
import TotalLeavesByDepartment from "./chartcomponent/TotalLeavesByDepartment";

const ReportPage = () => {
  return (
    <div>
      <table border="1" cellPadding="1" cellSpacing="0" style={{ width: "100%", tableLayout: "fixed" }}>
        <tbody>

          <tr>
            <td style={{ height: "400px", verticalAlign: "top" }}>
              <EmployeeByDepartment />
            </td>
            <td style={{ height: "400px", verticalAlign: "top" }}>
                <TotalLeavesByDepartment />
            </td>
          </tr>

          <tr>
            <td style={{ height: "100%", verticalAlign: "top" }}>
                <EmployeesGrouped />
            </td>
            <td style={{ height: "100%", verticalAlign: "top" }}>
                <CustomFieldsReport />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
