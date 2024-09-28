const EmployeeClock = () => {
    return ( 
        <div className="bg-gradient-to-r from-yellow-600 to-red-600 flex flex-row  h-24 rounded-lg m-1 p-4">
            <div className="flex flex-col w-1/6 justify-center items-center m-2">
                
                <div className="text-xs text-gray-700 pt-2">Partialy cloudy</div>
            </div>
            <div className="border-solid border-r-2 border-neutral-900"></div>
            <div className="w-1/3 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-900">21 September 2023</div>
                <div className="text-2xl font-bold">09:30 AM</div>
            </div>
            <div className="w-1/4 max-w-44">
                <img src="present-on-time.png" className="-mt-10 ml-5 -mb-2 w-24 h-24"></img>
                <div className="bg-green-700 p-1 rounded-xl text-sm text-center">Precent-on time</div>
            </div>
            <div className="w-1/4 flex flex-col m-2 ml-4 justify-center">
                <div className="text-sm text-gray-300">Entry time</div>
                <div className="text-xl font-bold text-gray-300">09:30 AM</div>
            </div>
        </div>
     );
}
 
export default EmployeeClock;