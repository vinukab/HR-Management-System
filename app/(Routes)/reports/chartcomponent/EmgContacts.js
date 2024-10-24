"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming Input is a custom component in your project

export default function EmployeeIDInputForm() {
  const [employeeID, setEmployeeID] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/report/emp-details/${employeeID}`); 
      if (!response.ok) {
        throw new Error("Employee not found");
      }
      const data = await response.json();
      setEmployeeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#E1F0DA] rounded-lg shadow-md max-w-md mx-auto">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
            <Input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            className="flex-grow bg-white shadow-md" 
            />
            
            <button type="submit" className="btn btn-primary bg-[#99BC85] px-4 py-2 rounded-md shadow-md">
            {loading ? "Loading..." : "Submit"}
            </button>
        </div>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {employeeData && (
        <div className="mt-6 space-y-6">
          <div className="p-4 rounded-lg bg-[#99BC85] shadow-md">
            <h2 className="text-xl font-bold pt-2 pb-2">Emergency Contacts:</h2>
            {employeeData.emergencyPersons.length > 0 ? (
              employeeData.emergencyPersons.map((person) => (
                <div key={person.phone_num} className="mb-4">
                  <p><strong>Name:</strong> {person.person_name}</p>
                  <p><strong>Relationship:</strong> {person.relationship}</p>
                  <p><strong>Address:</strong> {person.address}</p>
                  <p><strong>Phone Number:</strong> {person.phone_num}</p>
                  <hr className="border-black"/>
                </div>
              ))
            ) : (
              <p style={{color: '#C62E2E'}} >No emergency contacts found.</p>
            )}
          </div>

          <div className="p-4 rounded-lg shadow-lg bg-[#99BC85] shadow-md">
            <h2 className="text-xl font-bold pt-2 pb-2">Dependents:</h2>
            {employeeData.dependents.length > 0 ? (
              employeeData.dependents.map((dependent) => (
                <div key={dependent.dependent_id} className="mb-4">
                  <p><strong>Name:</strong> {dependent.dependent_name}</p>
                  <p><strong>Relationship:</strong> {dependent.relationship}</p>
                  <p><strong>Gender:</strong> {dependent.gender}</p>
                  <p><strong>Covered by Insurance:</strong> {dependent.is_covered_by_insurance ? "Yes" : "No"}</p>
                  <hr className="border-black"/>
                </div>
              ))
            ) : (
              <p style={{color: '#C62E2E'}}>No dependents found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
