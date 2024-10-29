'use client'
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import Title from "@/app/layouts/Titlebar";
import SideBar from '@/app/layouts/Sidebar';

const AddEmergencyPerson = ({params}) => {
    const employee_id = params.employee_id;
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
      const response = await axios.post('http://localhost:5000/employee/addEmergencyPerson', {
        ...EmergencyPerson,
        phone_numbers: phoneNumbers
      },{withCredentials: true});
      onSuccess(employee_id, 5);
    } catch (error) {
      console.error('There was an error adding the emergency person!', error);
      alert('Failed to add emergency person.');
    }
  };

  return (
    <>
    <SideBar/>
    <div className="ml-56">
       <div className="m-1 bg-white rounded-lg shadow-md">
      <Title title="Add Emergency Person" />

      <div className="grid grid-cols-3 gap-4 p-5">
        {/* Left Side - Image */}
        <div className="col-span-1 flex justify-center items-center h-full">
          <img src="Job_Details.png" className="max-w-full max-h-full" alt="Logo" />
        </div>

        {/* Right Side - Form */}
        <div className="col-span-2">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800 text-center">Add Emergency Person</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Emergency Person Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Person Name</label>
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
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
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
                <label className="block text-sm font-medium text-gray-700">Address</label>
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
                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input
                  type="text"
                  name="employee_id"
                  value={EmergencyPerson.employee_id}
                  placeholder="Employee ID"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  disabled
                />
              </div>

              {/* Phone Numbers Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
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
                <div className="flex items-center mt-2">
                  <button
                    type="button"
                    onClick={addPhoneNumberField}
                    className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Submit button positioned at the bottom right */}
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  Add Emergency Person
                </button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
    </div>
   </>
  );
};

export default AddEmergencyPerson;
