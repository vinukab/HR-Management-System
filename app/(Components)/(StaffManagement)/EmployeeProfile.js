import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const EmployeeProfile = () => {

const employee = {
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    supervisorId: "SUP123",
    birthDate: "1990-01-01",
    maritalStatus: "Married",
    nic: "123456789",
    address: "123 Main St, Anytown, USA",
    jobTitle: "Software Engineer",
    payGrade: "PG-4",
    department: "Engineering",
    profilePicture: "https://via.placeholder.com/150",
  };
  
  return (
    <Card className="max-w-md mx-auto bg-white shadow-md rounded-lg">
      <CardHeader className="flex items-center">
        <img 
          src={employee.profilePicture} 
          alt={`${employee.firstName} ${employee.lastName}`} 
          className="w-16 h-16 rounded-full mr-4" 
        />
        <div>
          <h2 className="text-lg font-bold">{`${employee.firstName} ${employee.lastName}`}</h2>
          <p className="text-sm text-gray-600">@{employee.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <strong>Personal Information</strong>
          <ul className="list-disc list-inside">
            <li>Supervisor ID: {employee.supervisorId}</li>
            <li>Date of Birth: {employee.birthDate}</li>
            <li>Marital Status: {employee.maritalStatus}</li>
            <li>NIC: {employee.nic}</li>
            <li>Address: {employee.address}</li>
          </ul>
        </div>
        <div className="mb-2">
          <strong>Job Details</strong>
          <ul className="list-disc list-inside">
            <li>Job Title: {employee.jobTitle}</li>
            <li>Pay Grade: {employee.payGrade}</li>
            <li>Department: {employee.department}</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit Details
        </button>
      </CardFooter>
    </Card>
  );
};
export default EmployeeProfile;
