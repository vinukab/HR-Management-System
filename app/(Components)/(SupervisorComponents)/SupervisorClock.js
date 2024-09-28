import { Icon, Sun } from "lucide-react";

const SupervisorClock = () => {
    return ( 
        <div className="bg-gradient-to-r from-green-700 to-gray-900 flex flex-row  h-24 rounded-lg m-1 p-4">
            <div className="flex flex-col w-1/6 justify-center items-center m-2">
                <Sun/>
                <div className="text-xs text-gray-900 pt-2">Partialy cloudy</div>
            </div>
            <div className="border-solid border-r-2 border-neutral-900"></div>
            <div className="w-1/3 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-900">21 September 2023</div>
                <div className="text-2xl font-bold">09:30 AM</div>
            </div>
            <div className="flex flex-row ml-auto">
                <div className="flex flex-row justify-between text-green-600 text-xs mt-1 gap-10">
                    <div className="flex flex-col items-end">
                        <div className="font-bold">On Time</div>
                        <div className="text-4xl font-bold">70</div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="font-bold">Late</div>
                        <div className="text-4xl font-bold">20</div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="font-bold">Absent</div>
                        <div className="text-4xl font-bold">7</div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="font-bold">Leave</div>
                        <div className="text-4xl font-bold">3</div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default SupervisorClock;