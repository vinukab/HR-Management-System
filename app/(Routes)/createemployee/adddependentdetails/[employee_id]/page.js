'use client';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import Title from "@/app/layouts/Titlebar";
import { useRouter } from 'next/navigation';
import SideBar from "@/app/layouts/Sidebar";

const AddDependent = ({ params }) => {
  const employee_id = params.employee_id;
  const router = useRouter();
  const [dependent, setDependent] = useState({
    dependent_name: '',
    relationship: '',
    gender: '',
    is_covered_by_insurance: false,
    employee_id: employee_id || ''
  });
  const [dependentsList, setDependentsList] = useState([]); // State to store all dependents

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDependent({
      ...dependent,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddDependent = () => {
    setDependentsList([...dependentsList, dependent]); // Add the current dependent to the list
    setDependent({ // Reset the input fields
      dependent_name: '',
      relationship: '',
      gender: '',
      is_covered_by_insurance: false,
      employee_id: employee_id || ''
    });
  };

  const handleRemoveDependent = (indexToRemove) => {
    setDependentsList(dependentsList.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request for each dependent in dependentsList
      await Promise.all(
        dependentsList.map(dep => 
          axios.post('http://localhost:5000/employee/addDependent', dep, { withCredentials: true })
        )
      );
      console.log('All dependents added successfully!');
      router.push(`/createemployee/addpersonaldetails`);
    } catch (error) {
      console.error('There was an error adding the dependents!', error);
      alert('Failed to add dependents.');
    }
  };

  return (
    <>
      <SideBar />
      <div className="ml-56">
        <Title />
        <div className="m-1 bg-white rounded-lg shadow-md">
          <Card className="shadow-md bg-gray-800 text-gray-200 border border-gray-700">
            <CardHeader style={{ marginLeft: '700px' }}>
              <h2 className="text-xl font-semibold text-white">Add Dependent</h2>
            </CardHeader>
            <div className="grid grid-cols-3 gap-4 p-5 bg-gray-800">
              <div className="col-span-1 flex justify-center items-center h-[34.099rem] -mt-20">
                <img src="https://img.freepik.com/free-photo/love-scene-with-3d-characters_1048-4525.jpg?t=st=1730224370~exp=1730227970~hmac=8e8a96fc7d53b0c36a61acdb9dd1e720e7d1187505727cb60cc0854217fbe3d7&w=826" className="max-w-full max-h-full" alt="Logo" />
              </div>
              <div className="col-span-2">
                <CardContent>
                  <form className="space-y-4">
                    {/* Dependent Name Field */}
                    <div>
                      <label className="text-white border-gray-700">Dependent Name</label>
                      <input
                        type="text"
                        name="dependent_name"
                        placeholder="Dependent Name"
                        value={dependent.dependent_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Relationship Field */}
                    <div>
                      <label className="text-white border-gray-700">Relationship</label>
                      <input
                        type="text"
                        name="relationship"
                        placeholder="Relationship"
                        value={dependent.relationship}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Gender Field */}
                    <div>
                      <label className="text-white border-gray-700">Gender</label>
                      <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        value={dependent.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>

                    {/* Insurance Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="is_covered_by_insurance"
                        checked={dependent.is_covered_by_insurance}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label className="text-white border-gray-700">Covered by Insurance</label>
                    </div>

                    {/* Add Dependent Button */}
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={handleAddDependent}
                        className="text-white px-4 py-2 rounded-md bg-[#1e40af] hover:bg-[#1d4ed8]"
                      >
                        Add Dependent
                      </button>
                      <button type="button"
                        onClick={handleSubmit}
                        className="text-white px-4 py-2 rounded-md bg-[#1e40af] hover:bg-[#1d4ed8]"
                      >
                Next
              </button>
                    </div>
                  </form>

                  {/* Display the list of dependents */}
                  {dependentsList.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-500">Dependents Added:</h3>
                      <ul className="space-y-2 mt-2">
                        {dependentsList.map((dep, index) => (
                          <li key={index} className="p-2 border border-gray-300 rounded-md flex justify-between items-center">
                            <div>
                              <p><strong>Name:</strong> {dep.dependent_name}</p>
                              <p><strong>Relationship:</strong> {dep.relationship}</p>
                              <p><strong>Gender:</strong> {dep.gender}</p>
                              <p><strong>Insurance:</strong> {dep.is_covered_by_insurance ? 'Yes' : 'No'}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveDependent(index)}
                              className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-800"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </div>
            </div>
            <CardFooter className="flex justify-end mt-6">
              {/* Next Button */}
              
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddDependent;
