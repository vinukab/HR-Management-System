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
            <div className="flex flex-row">
                <div className="flex-grow bg-gray-800 p-4 rounded-lg shadow-md">
                    <SupervisorClock />
                    <EmployeeToDOList />
                </div>
                <div className="ml-4 bg-gray-800 p-4 rounded-lg shadow-md">
                    <CreateLeaveRequest />
                </div>
            </div>
            <div className="flex flex-row w-full mt-4">
                <div className="flex-grow bg-gray-800 p-4 rounded-lg shadow-md">
                    <SupervisorLeavePanel />
                </div>
                <div className="ml-4 bg-gray-800 p-4 rounded-lg shadow-md">
                    <RemLeaveCounts />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
