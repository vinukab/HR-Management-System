import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useState } from 'react';

const AddEmergencyPerson = ({ employee_id, onSuccess }) => {
  const [EmergencyPerson, setEmergencyPerson] = useState({
    person_name: '',
    relationship: '',
    address: '',
    employee_id: employee_id || ''
  });

  const [phoneNumbers, setPhoneNumbers] = useState(['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmergencyPerson({
      ...EmergencyPerson,
      [name]: value
    });
  };

  const handlePhoneNumberChange = (index, e) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = e.target.value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const addPhoneNumberField = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const removePhoneNumberField = (index) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers.splice(index, 1);
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/addEmergencyPerson', {
        ...EmergencyPerson,
        phone_numbers: phoneNumbers
      });
      onSuccess(employee_id, 5);
    } catch (error) {
      console.error('There was an error adding the emergency person!', error);
      alert('Failed to add emergency person.');
    }
  };

  return (
    <Card className="bg-slate-800">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Add Emergency Person</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Emergency Person Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Person Name</label>
            <input
              type="text"
              name="person_name"
              placeholder="Person Name"
              value={EmergencyPerson.person_name}
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
              value={EmergencyPerson.relationship}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={EmergencyPerson.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Employee ID Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={EmergencyPerson.employee_id}
              placeholder="Employee ID"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Phone Numbers Section */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Phone Numbers</label>
            {phoneNumbers.map((phoneNumber, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(index, e)}
                  placeholder={`Phone Number ${index + 1}`}
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {phoneNumbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoneNumberField(index)}
                    className="ml-2 text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoneNumberField}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Phone Number
            </button>
          </div>

          {/* Submit button */}
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Add Emergency Person
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEmergencyPerson;
