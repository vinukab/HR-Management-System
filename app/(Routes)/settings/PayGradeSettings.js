import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PayGradeSettings = () => {
  const [payGrades, setPayGrades] = useState([]);
  const [newGrade, setNewGrade] = useState(''); // For adding a new grade
  const [error, setError] = useState(null);

  // Fetch pay grades on initial load
  useEffect(() => {
    fetchPayGrades();
  }, []);

  // Fetch pay grades from the backend
  const fetchPayGrades = async () => {
    try {
      const response = await axios.get('http://localhost:5000/paygrade/all');
      setPayGrades(response.data);
    } catch (err) {
      console.error('Error fetching pay grades:', err);
      setError('Error fetching pay grades');
    }
  };

  // Add a new pay grade
  const addPayGrade = async () => {
    if (!newGrade) return; // Ensure input is not empty
    try {
      const response = await axios.post('http://localhost:5000/paygrade/add', { grade: newGrade });
      setPayGrades([...payGrades, response.data]); // Add the new pay grade to the list
      setNewGrade(''); // Clear the input field
    } catch (err) {
      console.error('Error adding pay grade:', err);
      setError('Error adding pay grade');
    }
  };

  // Delete an existing pay grade
  const deletePayGrade = async (payGradeId) => {
    try {
      await axios.delete(`http://localhost:5000/paygrade/delete/${payGradeId}`);
      setPayGrades(payGrades.filter((payGrade) => payGrade.pay_grade_id !== payGradeId)); // Remove deleted pay grade from list
    } catch (err) {
      console.error('Error deleting pay grade:', err);
      setError('Error deleting pay grade');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pay Grade Settings</h2>
      
      {/* Add Pay Grade Section */}
      <div className="mb-4">
        <input
          type="text"
          value={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
          placeholder="(e.g., Level5)"
          className="border border-gray-300 rounded p-1 mr-2"
        />
        <button onClick={addPayGrade} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Pay Grade
        </button>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pay Grades List */}
      <ul className="list-disc list-inside">
        {payGrades.map((payGrade) => (
          <li key={payGrade.pay_grade_id} className="mb-2 flex justify-between items-center">
            <span>
              <strong>{payGrade.grade}</strong> - ID: {payGrade.pay_grade_id}
            </span>
            <button
              onClick={() => deletePayGrade(payGrade.pay_grade_id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayGradeSettings;
