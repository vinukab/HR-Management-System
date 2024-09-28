import classNames from "classnames";
import { ClipboardMinus, Clock, Icon, LayoutDashboard, Leaf, Settings, User2Icon } from "lucide-react";

const SideBar = ({ activePanel, setActivePanel }) => {
    
    return ( 
        <div className="flex flex-col h-screen fixed left-0 bg-black w-56 items-center gap-4">
            <img src="logo.png" className="w-full p-10 pt-16" alt="Logo"></img>
            {/*Buttons*/}
            <div className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", {'bg-black': !(activePanel==0), 'bg-rose-700': (activePanel==0)})}>
                <button onClick={() => setActivePanel(0)} className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4">
                    <LayoutDashboard/>
                    Dashboard
                </button>
            </div>
            <div onClick={() => setActivePanel(1)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", {'bg-black': !(activePanel==1), 'bg-rose-700': (activePanel==1)})}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4">
                    <User2Icon/>
                    Employee Management
                </button>
            </div>
            <div onClick={() => setActivePanel(2)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", {'bg-black': !(activePanel==2), 'bg-rose-700': (activePanel==2)})}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4">
                    <Clock/>
                    Profile
                </button>
            </div>
            <div onClick={() => setActivePanel(3)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", {'bg-black': !(activePanel==3), 'bg-rose-700': (activePanel==3)})}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4">
                    <Leaf/>
                    Leave Management
                </button>
            </div>
            <div onClick={() => setActivePanel(4)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", {'bg-black': !(activePanel==4), 'bg-rose-700': (activePanel==4)})}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4">
                    <ClipboardMinus/>
                    Report
                </button>
            </div>
            <div onClick={() => setActivePanel(5)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", {'bg-black': !(activePanel==5), 'bg-rose-700': (activePanel==5)})}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4">
                    <Settings/>
                    Settings
                </button>
            </div>
        </div>
     );
}
 
export default SideBar;