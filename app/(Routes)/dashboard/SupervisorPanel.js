import Title from "../../(Components)/(Layout)/Titlebar";
import { LeaveCredit } from "../../(Components)/(LeaveManagement)/LeaveCredit";
import SupervisorLeavePanel from "../../(Components)/(LeaveManagement)/SupervisorLeavePanel";
import EmployeeCalendar from "../../(Components)/(ProjectManagement)/EmployeeCalander";
import { ProjectDetails } from "../../(Components)/(ProjectManagement)/ProjectDetails";
import CreateEmployee from "../../(Components)/(StaffManagement)/EmployeeCreator";
import Notice from "../../(Components)/(StaffManagement)/EmployeeNotification";
import SupervisorClock from "../../(Components)/(SupervisorComponents)/SupervisorClock";

const SupervisorPanel = () => {
    return ( 
        <div className="h-full bg-gray-200">
            <Title />
            <div className="flex flex-row w-full flex-grow bg-black">
                <div className="flex-grow h-auto bg-slate-600">
                    <SupervisorClock/>
                    <SupervisorLeavePanel/>
                </div>
                <Notice/>
            </div>
            <ProjectDetails/>
            <div className="flex flex-row w-full">
                <EmployeeCalendar/>
                <LeaveCredit/>
            </div>
            <CreateEmployee/>
        </div>
     );
}
 
export default SupervisorPanel;