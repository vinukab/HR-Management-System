import { useState, useEffect } from "react";
import { Icon, Sun } from "lucide-react";

const SupervisorClock = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clean up on unmount
    }, []);

    const formattedDate = currentDateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return ( 
        <div className="bg-blue-900 flex flex-row h-24 rounded-lg m-1 p-4">
            <div className="flex flex-col w-1/5 justify-center items-center m-2 ">
                <Sun />
                <div className="text-xs text-white pt-2">Partially cloudy</div>
            </div>
            <div className="border-solid border-r-2 border-neutral-900"></div>
            <div className="w-1/3 flex flex-col m-2 ml-4 justify-center text-white">
                <div className="text-sm ">{formattedDate}</div>
                <div className="text-2xl font-bold">{formattedTime}</div>
            </div>
            <div className="flex flex-row ml-auto">
                <div className="flex flex-row justify-between text-white text-xs mt-1 gap-10">
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
