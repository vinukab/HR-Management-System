import Title from "../../layouts/Titlebar";
import { RemLeaveCounts } from "./employee components/RemLeaveCounts";
import SupervisorLeavePanel from "./supervisor components/SupervisorLeavePanel";
import SupervisorClock from "./supervisor components/SupervisorClock";
import CreateLeaveRequest from "./employee components/CreateLeaveRequest";
import EmployeeToDOList from "./employee components/EmployeeToDOList";

const AdminDashboard = () => {
    return ( 
        <div className="h-full bg-gray-700 text-gray-900">
            <Title />
            <div className="flex flex-row h-screen p-4">
                <div className="flex-grow bg-gray-800 p-4 rounded-lg shadow-md">
                    <EmployeeToDOList />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
