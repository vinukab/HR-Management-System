import EmployeeClock from "./(EmployeeComponents)/EmployeeClock";
import EmployeeLeavePanel from "./(LeaveManagement)/EmplyeeLeavePanel";
import Title from "./(layout)/Titlebar";
import EmployeeCalander from "./(EmployeeComponents)/EmployeeCalander";
import Notice from "./(Components)/(StaffManagement)/EmployeeNotification";
import {LeaveCredit} from "./(Components)/(LeaveManagement)/LeaveCredit";
import CreatLeaveRequest from "./(Components)/(LeaveManagement)/CreateLeaveRequest";

const EmployeePanel = () => {
    return ( 
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row w-full flex-grow">
                <div className="flex-grow">
                    <EmployeeClock/>
                    <EmployeeLeavePanel/>
                </div>
                <Notice/>
            </div>
            <div className="flex flex-row w-full">
                <EmployeeCalander/>
                <LeaveCredit/>
            </div>
            <CreatLeaveRequest/>
        </div>
     );
}
 
export default EmployeePanel;