'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Profile = ({params}) => {
    const employee_id = params.employee_id;
  const [dependents, setDependents] = useState([]);
  const [selectedDependent, setSelectedDependent] = useState(null);
  const [dependentDetails, setDependentDetails] = useState({
    dependent_name: '',
    relationship: '',
    gender: '',
    is_covered_by_insurance: false,
  });

  useEffect(() => {
    const fetchDependents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dependents?employee_id=${employee_id}`,{withCredentials: true});
        setDependents(response.data);
      } catch (error) {
        console.error('Error fetching dependents:', error);
      }
    };
    fetchDependents();
  }, [employee_id]);

  const handleDependentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDependentDetails({
      ...dependentDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleDependentSelect = (e) => {
    const dependentId = parseInt(e.target.value, 10);
    const selected = dependents.find(dep => dep.dependent_id === dependentId);
    if (selected) {
      setSelectedDependent(selected);
      setDependentDetails({
        dependent_name: selected.dependent_name,
        relationship: selected.relationship,
        gender: selected.gender,
        is_covered_by_insurance: selected.is_covered_by_insurance,
      });
    }
  };

  const handleDependentUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateDependent/${selectedDependent.dependent_id}`, dependentDetails);
      alert('Dependent updated successfully');
      const response = await axios.get(`http://localhost:5000/dependents?employee_id=${employee_id}`);
      setDependents(response.data);
    } catch (error) {
      console.error('Error updating dependent:', error);
      alert('Failed to update dependent.');
    }
  };

  return (
    <div>
      <Card className="bg-slate-800 mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-white">Update Dependent</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label className="block text-sm font-medium text-gray-300">Select Dependent</Label>
            <select
              onChange={handleDependentSelect}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select a dependent</option>
              {dependents.map((dependent) => (
                <option key={dependent.dependent_id} value={dependent.dependent_id}>
                  {dependent.dependent_name}
                </option>
              ))}
            </select>

            {selectedDependent && (
              <form onSubmit={handleDependentUpdate} className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-300">Dependent Name</Label>
                  <Input
                    type="text"
                    name="dependent_name"
                    value={dependentDetails.dependent_name}
                    onChange={handleDependentChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300">Relationship</Label>
                  <Input
                    type="text"
                    name="relationship"
                    value={dependentDetails.relationship}
                    onChange={handleDependentChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300">Gender</Label>
                  <Input
                    type="text"
                    name="gender"
                    value={dependentDetails.gender}
                    onChange={handleDependentChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    name="is_covered_by_insurance"
                    checked={dependentDetails.is_covered_by_insurance}
                    onChange={handleDependentChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <Label className="ml-2 block text-sm text-gray-300">Covered by Insurance</Label>
                </div>

                <Button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Update Dependent
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
