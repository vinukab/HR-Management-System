import Title from "../../layouts/Titlebar";
import { RemLeaveCounts } from "./employee components/RemLeaveCounts";
import SupervisorLeavePanel from "./supervisor components/SupervisorLeavePanel";
import SupervisorClock from "./supervisor components/SupervisorClock";
import CreatLeaveRequest from "./employee components/CreateLeaveRequest";
import EmployeeToDOList from "./employee components/EmployeeToDOList";

const HRManagerDashboard = () => {
    return ( 
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row">
                <div className="flex-grow">
                    <SupervisorClock/>
                    <CreatLeaveRequest />
                </div>
                <CreatLeaveRequest />
            </div>
            <div className="flex flex-row w-full">
                <EmployeeToDOList />
                <RemLeaveCounts />
            </div>
            <SupervisorLeavePanel/>
        </div>
     );
}
 
export default HRManagerDashboard;