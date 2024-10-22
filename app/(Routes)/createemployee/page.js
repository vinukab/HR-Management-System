'use client';
import SideBar from '../../layouts/Sidebar';
import EmployeeCreator from './EmployeeCreator';

const CreateEmployee = () => {

  return (
    <div className="flex">
          <SideBar activePanel={1} role = {'Admin'} />
          <div className="flex flex-col lg:ml-56 w-full ">
                <EmployeeCreator/>
          </div>
    </div>
  );
};

export default CreateEmployee;
