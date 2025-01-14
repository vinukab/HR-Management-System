import EmployeeClock from "./employee components/EmployeeClock";
import LeaveRequestPanel from "./employee components/LeaveRequestPanel";
import Title from "../../layouts/Titlebar";
import EmployeeToDOList from "./employee components/EmployeeToDOList";
import { RemLeaveCounts } from "./employee components/RemLeaveCounts";
import CreatLeaveRequest from "./employee components/CreateLeaveRequest";
import { useState } from "react";

const EmployeeDashboard = () => {
    const [leaveData, setLeaveData] = useState([]);
    return (
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row">
                <div className="flex-grow">
                    <LeaveRequestPanel leaveData = {leaveData} setLeaveData = {setLeaveData}/>
                </div>
                <CreatLeaveRequest leaveData={leaveData} setLeaveData={setLeaveData} />
            </div>
            <div className="flex flex-row w-full">
                <EmployeeToDOList />
                <RemLeaveCounts />
            </div>
        </div>
    );
}

export default EmployeeDashboard;
