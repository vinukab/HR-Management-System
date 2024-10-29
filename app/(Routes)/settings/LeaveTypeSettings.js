// LeaveSettings.js
import React, { useEffect, useState } from 'react';
import { fetchLeaveTypes, deleteLeaveType } from '../actions/leaveActions';
import { useDispatch, useSelector } from 'react-redux';

const LeaveSettings = () => {
  const dispatch = useDispatch();
  const leaveTypes = useSelector((state) => state.leave.leaveTypes);

  useEffect(() => {
    dispatch(fetchLeaveTypes());
  }, [dispatch]);

  const handleDelete = (leaveTypeId) => {
    if (window.confirm("Are you sure you want to delete this leave type?")) {
      dispatch(deleteLeaveType(leaveTypeId))
        .then(() => dispatch(fetchLeaveTypes())); // Refresh list after delete
    }
  };

  return (
    <div>
      <h1>Leave Settings</h1>
      <ul>
        {leaveTypes.map((leaveType) => (
          <li key={leaveType.leave_type_id}>
            {leaveType.type_name} ({leaveType.default_days} days)
            <button onClick={() => handleDelete(leaveType.leave_type_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveSettings;
