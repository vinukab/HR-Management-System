import { EmployeeLeaveChart } from "../../(Components)/(LeaveManagement)/EmployeeLeaveChart";
import EmployeeLeavePanel from "../../(Components)/(LeaveManagement)/EmplyeeLeavePanel";
import { LeaveStaticstics } from "../../(Components)/(LeaveManagement)/LeaveStaticstics";
import EmployeeSearch from "../../(Components)/(StaffManagement)/EmployeeSearch";
import SupervisorClock from "../../(Components)/(SupervisorComponents)/SupervisorClock";

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