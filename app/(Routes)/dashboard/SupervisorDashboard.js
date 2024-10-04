import Title from "../../layouts/Titlebar";
import { RemLeaveCounts } from "./employee components/RemLeaveCounts";
import SupervisorLeavePanel from "./supervisor components/SupervisorLeavePanel";
import SupervisorClock from "./supervisor components/SupervisorClock";
import CreatLeaveRequest from "./employee components/CreateLeaveRequest";
import EmployeeToDOList from "./employee components/EmployeeToDOList";
import {LeaveStaticstics} from "./supervisor components/LeaveStaticstics";

const SupervisorDashboard = () => {
    
     return (
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row">
                <div className="flex-grow">
                    <SupervisorClock/>
                    <SupervisorLeavePanel/>
                </div>
                <LeaveStaticstics />
            </div>
            <div className="flex flex-row w-full">
                <EmployeeToDOList />
                <RemLeaveCounts />
            </div>
        </div>
    );
}
 
export default SupervisorDashboard;