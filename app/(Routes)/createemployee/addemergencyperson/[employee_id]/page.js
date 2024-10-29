'use client';
import axios from 'axios';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import Title from "@/app/layouts/Titlebar";
import SideBar from '@/app/layouts/Sidebar';
import { useRouter } from 'next/navigation';

const AddEmergencyPerson = ({ params }) => {
  const router = useRouter();
  const employee_id = params.employee_id;
  const [EmergencyPerson, setEmergencyPerson] = useState({
    person_name: '',
    relationship: '',
    address: '',
    employee_id: employee_id || ''
  });

  const [phoneNumbers, setPhoneNumbers] = useState(['']);
  const [addedPersons, setAddedPersons] = useState([]); // Store added emergency persons

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
      }, { withCredentials: true });
      
      setAddedPersons([...addedPersons, { ...EmergencyPerson, phone_numbers: phoneNumbers }]); // Add to the list
      
      // Clear form fields for next entry
      setEmergencyPerson({ person_name: '', relationship: '', address: '', employee_id });
      setPhoneNumbers(['']);
    } catch (error) {
      console.error('There was an error adding the emergency person!', error);
      alert('Failed to add emergency person.');
    }
  };

  const haddleNext = async () => {
    try {
      const promises = addedPersons.map(person => axios.post('http://localhost:5000/employee/addDependent', {person}, { withCredentials: true }));
      await Promise.all(promises);
      router.push(`/createemployee/adddependentdetails/${employee_id}`);
    } catch (error) {
      console.error('There was an error submitting the emergency persons!', error);
      alert('Failed to submit emergency persons.');
    }
  };
  const removeAddedPerson = (index) => {
    setAddedPersons(addedPersons.filter((_, i) => i !== index));
  };

  return (
    <>
      <SideBar />
      <div className="ml-56">
        <div className="m-1 bg-white rounded-lg shadow-md">
          <Title title="Add Emergency Person" />
          <div className="grid grid-cols-3 gap-4 p-5">
            <div className="col-span-1 flex justify-center items-center h-full">
              <img src="Job_Details.png" className="max-w-full max-h-full" alt="Logo" />
            </div>

            <div className="col-span-2">
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-800 text-center">Add Emergency Person</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Emergency Person Fields */}
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
                    <button
                      type="button"
                      onClick={addPhoneNumberField}
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-between mt-4">
                    <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700">
                      Add Emergency Person
                    </button>
                    <button type="button" onClick={haddleNext} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Next
                    </button>
                  </div>
                </form>
        
                {/* Display Added Emergency Persons */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Added Emergency Persons</h3>
                  {addedPersons.map((person, index) => (
                    <div key={index} className="border-t border-gray-200 pt-4 mt-4">
                      <p><strong>Name:</strong> {person.person_name}</p>
                      <p><strong>Relationship:</strong> {person.relationship}</p>
                      <p><strong>Address:</strong> {person.address}</p>
                      <p><strong>Phone Numbers:</strong> {person.phone_numbers.join(', ')}</p>
                      <button
                        type="button"
                        onClick={() => removeAddedPerson(index)}
                        className="mt-2 text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmergencyPerson;
