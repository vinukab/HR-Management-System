'use client'
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useState } from 'react';
import Title from "@/app/layouts/Titlebar";
import { useRouter } from 'next/navigation';

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
        dependentsList.map(dependent => 
          axios.post('http://localhost:5000/employee/addDependent', dependent, { withCredentials: true })
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
    <Card className="bg-white">
      <Title />
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Add Dependent</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* Dependent Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Dependent Name</label>
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
            <label className="block text-sm font-medium text-gray-300">Relationship</label>
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
            <label className="block text-sm font-medium text-gray-300">Gender</label>
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
            <label className="ml-2 block text-sm text-gray-300">Covered by Insurance</label>
          </div>

          {/* Add Dependent Button */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleAddDependent}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Add Dependent
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

      <CardFooter className="flex justify-end mt-6">
        {/* Next Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
          Next
        </button>
      </CardFooter>
    </Card>
  );
};

export default AddDependent;
