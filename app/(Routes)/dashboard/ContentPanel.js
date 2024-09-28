import EmployeeProfile from "../../(Components)/(StaffManagement)/EmployeeProfile";
import EmployeeManagement from "./EmplyeeManagement";
import SupervisorPanel from "./SupervisorPanel";

const ContentPanel = (activePanel) => {
    const activePanel1 = activePanel.activePanel;
    console.log(activePanel1);
    if(activePanel1 == 0)return (<SupervisorPanel/>);
    if(activePanel1 == 1)return (<EmployeeManagement/>);
    if(activePanel1 == 2)return (<EmployeeProfile/>);
    else return (<div>Under Construction</div>);
}
 
export default ContentPanel;