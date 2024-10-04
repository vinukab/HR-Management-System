import { EmployeeLeaveChart } from "../dashboard/supervisor components/EmployeeLeaveChart";
import EmployeeLeavePanel from "../../layouts/(LeaveManagement)/EmplyeeLeavePanel";
import { LeaveStaticstics } from "../../layouts/(LeaveManagement)/LeaveStaticstics";
import EmployeeSearch from "../../layouts/(StaffManagement)/EmployeeSearch";
import SupervisorClock from "../../layouts/(SupervisorComponents)/SupervisorClock";

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