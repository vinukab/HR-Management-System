'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveTypeSettings = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payGrades, setPayGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaveTypesResponse = await axios.get('http://localhost:5000/leave/alltypes', { withCredentials: true });
        const payGradesResponse = await axios.get('http://localhost:5000/paygrade/all', { withCredentials: true });
        
        const temp = payGradesResponse.data.sort((a, b) => parseInt(a.grade.substring(5)) - parseInt(b.grade.substring(5)));
        console.log(temp);
        setLeaveTypes(leaveTypesResponse.data);
        setPayGrades(payGradesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const incrementLeaveCount = async (leaveType) => {
    try {
      const updatedLeaveType = { ...leaveType, default_days: leaveType.default_days + 1 };
      await axios.put(`http://localhost:5000/leave/increment/${leaveType.leave_type_id}`, updatedLeaveType, { withCredentials: true });
      setLeaveTypes(leaveTypes.map((type) => (type.leave_type_id === leaveType.leave_type_id ? updatedLeaveType : type)));
    } catch (err) {
      console.error('Error updating leave type:', err);
      setError('Error updating leave type');
    }
  };

  const decrementLeaveCount = async (leaveType) => {
    try {
      if (leaveType.default_days > 0) {
        const updatedLeaveType = { ...leaveType, default_days: leaveType.default_days - 1 };
        await axios.put(`http://localhost:5000/leave/decrement/${leaveType.leave_type_id}`, updatedLeaveType, { withCredentials: true });
        setLeaveTypes(leaveTypes.map((type) => (type.leave_type_id === leaveType.leave_type_id ? updatedLeaveType : type)));
      }
    } catch (err) {
      console.error('Error updating leave type:', err);
      setError('Error updating leave type');
    }
  };

  if (loading) return <p>Loading leave types...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 ">Leave Type Settings</h2>
      {payGrades.map((payGrade) => (
        <div key={payGrade.pay_grade_id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{payGrade.grade}</h3>
          <ul className="list-disc list-inside mb-4">
            {leaveTypes
              .filter((leaveType) => leaveType.pay_grade_id === payGrade.pay_grade_id)
              .map((leaveType) => (
                <li key={leaveType.leave_type_id} className="mb-2">
                  <strong>{leaveType.type_name}</strong> - Default Days: {leaveType.default_days}
                  <button
                    onClick={() => incrementLeaveCount(leaveType)}
                    className="ml-4 px-3 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrementLeaveCount(leaveType)}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default LeaveTypeSettings;
