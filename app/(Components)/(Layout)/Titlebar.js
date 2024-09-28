import { Bell, Icon, LayoutDashboard, Mail, User } from "lucide-react";

const Title = () => {
    return (
      <div className='flex flex-col'>
        <div className="flex flex-row items-center justify-between h-10 bg-gray-200 px-4 ">
          <div className="flex items-center space-x-2 bg-white p-2 rounded-xl w-5/12 h-3/4 max-w-96">
            <LayoutDashboard/>
            <textarea 
              className="w-full h-full border-none focus:outline-none resize-none text-xs"
              placeholder="Search..."
            ></textarea>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <Bell/>
            <Mail/>
            <div className="flex flex-row items-center space-x-2">
              <User/>
              <div className="flex flex-col text-xs">
                <div className="font-semibold">Thimira Sahan</div>
                <div className="text-xs">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Title;
  