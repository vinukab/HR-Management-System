'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PayGradeSettings = () => {
  const [payGrades, setPayGrades] = useState([]);
  const [newGradeLevel, setNewGradeLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pay grades from the backend when the component mounts
  useEffect(() => {
    const fetchPayGrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/paygrade/all', { withCredentials: true });
        setPayGrades(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pay grades:', err);
        setError('Error fetching pay grades');
        setLoading(false);
      }
    };

    fetchPayGrades();
  }, []);

  // Handle input change for the new grade level
  const handleNewGradeChange = (e) => {
    setNewGradeLevel(e.target.value);
  };

  // Add a new pay grade
  const addPayGrade = async () => {
    try {
      const newPayGrade = { grade: newGradeLevel }; // Only the grade level is needed
      await axios.post('http://localhost:5000/paygrade/add', newPayGrade, { withCredentials: true });
      setPayGrades([...payGrades, { ...newPayGrade, pay_grade_id: uuidv4() }]);
      setNewGradeLevel(''); // Clear input field after adding
    } catch (err) {
      console.error('Error adding pay grade:', err);
      setError('Error adding pay grade');
    }
  };

  // Delete a pay grade
  const deletePayGrade = async (pay_grade_id) => {
    try {
      await axios.delete(`http://localhost:5000/paygrade/delete/${pay_grade_id}`, { withCredentials: true });
      setPayGrades(payGrades.filter((grade) => grade.pay_grade_id !== pay_grade_id));
    } catch (err) {
      console.error('Error deleting pay grade:', err);
      setError('Error deleting pay grade');
    }
  };

  if (loading) return <p>Loading pay grades...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Pay Grade Management</h2>
      
      {/* Form to Add New Pay Grade */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add New Pay Grade</h3>
        <input
          type="text"
          value={newGradeLevel}
          onChange={handleNewGradeChange}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Enter Level (e.g., 1 for Level1)"
        />
        <button onClick={addPayGrade} className="px-4 py-2 bg-green-500 text-white rounded">Add Pay Grade</button>
      </div>

      {/* List of Existing Pay Grades */}
      <ul className="list-disc list-inside mb-4">
        {payGrades.map((payGrade) => (
          <li key={payGrade.pay_grade_id} className="mb-2">
            <strong>{payGrade.grade}</strong>
            <button
              onClick={() => deletePayGrade(payGrade.pay_grade_id)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
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
