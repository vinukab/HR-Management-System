import { EmployeeLeaveChart } from "../dashboard/supervisor components/EmployeeLeaveChart";
import EmployeeLeavePanel from "../../layouts/(LeaveManagement)/EmplyeeLeavePanel";
import { LeaveStaticstics } from "../dashboard/supervisor components/LeaveStaticstics";
import EmployeeSearch from "../../layouts/(StaffManagement)/EmployeeSearch";
import SupervisorClock from "../dashboard/supervisor components/SupervisorClock";

const EmployeeManagement = () => {
    return ( 
        <div>
            <div className="flex">
                <div className="flex flex-col flex-grow">
                    <SupervisorClock/>
                    <EmployeeLeavePanel/>
                </div>
                <EmployeeLeaveChart/>
            </div>
           <LeaveStaticstics />
           <EmployeeSearch/>
        </div>
     );
}
 
export default EmployeeManagement;