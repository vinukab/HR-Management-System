import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useState } from 'react';

const AddDependent = ({ employee_id, onSuccess }) => {
  const [dependent, setDependent] = useState({
    dependent_name: '',
    relationship: '',
    gender: '',
    is_covered_by_insurance: false,
    employee_id: employee_id || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDependent({
      ...dependent,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/addDependent', {
        ...dependent
      }, { withCredentials: true });
      console.log('Dependent added successfully!', response.data);
      onSuccess(employee_id, 1);
    } catch (error) {
      console.error('There was an error adding the dependent!', error);
      alert('Failed to add dependent.');
    }
  };

  return (
    <Card className="bg-slate-800">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Add Dependent</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Employee ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={dependent.employee_id}
              placeholder="Employee ID"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Add
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddDependent;
