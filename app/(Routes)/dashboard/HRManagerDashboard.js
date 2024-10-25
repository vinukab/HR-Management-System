import Title from "../../layouts/Titlebar";
import { RemLeaveCounts } from "./employee components/RemLeaveCounts";
import SupervisorLeavePanel from "./supervisor components/SupervisorLeavePanel";
import SupervisorClock from "./supervisor components/SupervisorClock";
import CreatLeaveRequest from "./employee components/CreateLeaveRequest";
import EmployeeToDOList from "./employee components/EmployeeToDOList";
import LeaveRequestPanel from "./employee components/LeaveRequestPanel";

const HRManagerDashboard = () => {
    return ( 
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row w-full">
                <EmployeeToDOList />
            </div>
            <SupervisorLeavePanel/>
            <div className="flex flex-row">
                <div className="flex-grow">
                    <CreatLeaveRequest />
                    
                </div>
                <RemLeaveCounts />
                <LeaveRequestPanel/>
            </div>
            
        </div>
     );
}
 
export default HRManagerDashboard;