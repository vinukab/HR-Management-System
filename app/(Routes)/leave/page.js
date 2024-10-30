'use client'
import SupervisorClock from "../dashboard/supervisor components/SupervisorClock";
import SupervisorLeavePanel from "../dashboard/supervisor components/SupervisorLeavePanel";
import TotalLeavesByDepartment from "../reports/chartcomponent/TotalLeavesByDepartment";
import SideBar from "@/app/layouts/Sidebar";

const Leave = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar />

            <div className="flex flex-col flex-grow ml-56"> {/* Adjusted margin-left to accommodate sidebar */}
                <div className="bg-white shadow-md">
                    <SupervisorClock />
                </div>

                <div className="flex flex-row space-x-4 mt-4"> {/* Flex row for the main content */}
                    <div className="flex flex-col flex-grow bg-white rounded-lg shadow-md p-4">
                        <SupervisorLeavePanel />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leave;