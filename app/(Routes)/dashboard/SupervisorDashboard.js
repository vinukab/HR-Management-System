import Title from "../../layouts/Titlebar";
import { RemLeaveCounts } from "./employee components/RemLeaveCounts";
import SupervisorLeavePanel from "./supervisor components/SupervisorLeavePanel";
import SupervisorClock from "./supervisor components/SupervisorClock";
import CreatLeaveRequest from "./employee components/CreateLeaveRequest";
import EmployeeToDOList from "./employee components/EmployeeToDOList";
import {LeaveStaticstics} from "./supervisor components/LeaveStaticstics";
import LeaveRequestPanel from "./employee components/LeaveRequestPanel";

const SupervisorDashboard = () => {
    
     return (
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row">
                <div className="flex-grow">
                    <SupervisorLeavePanel/>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <CreatLeaveRequest/>
                <LeaveRequestPanel/>
                <RemLeaveCounts />
            </div>
            <EmployeeToDOList />
        </div>
    );
}
 
export default SupervisorDashboard;