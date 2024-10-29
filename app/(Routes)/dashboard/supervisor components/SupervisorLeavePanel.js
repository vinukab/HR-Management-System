import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SupervisorLeavePanel = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/leave', { withCredentials: true })
            .then(res => setLeaveRequests(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleApproval = async (leave_id) => {
        if (isUpdating) return;
        setIsUpdating(true);

        try {
            const updatedRequests = leaveRequests.map(request =>
                request.leave_id === leave_id ? { ...request, request_status: 'Approved' } : request
            );
            setLeaveRequests(updatedRequests);
            await axios.put('http://localhost:5000/leave/update', { leave_id, status: 'Approved' }, { withCredentials: true });
            alert('Leave request approved successfully!');
        } catch (err) {
            console.error(err);
            setLeaveRequests(prevRequests => prevRequests.map(request =>
                request.leave_id === leave_id ? { ...request, request_status: 'Pending' } : request
            ));
            alert('Failed to approve leave request. Please try again.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRejection = (leave_id) => {
        setLeaveRequests(prevRequests => {
            const updatedRequests = prevRequests.map(request =>
                request.leave_id === leave_id ? { ...request, request_status: 'Rejected' } : request
            );
            axios.put('http://localhost:5000/leave/update', { leave_id, status: 'Rejected' }, { withCredentials: true })
                .catch(err => console.error(err));
            return updatedRequests;
        });
    };

    const handleUndo = (leave_id) => {
        setLeaveRequests(prevRequests =>
            prevRequests.map(request =>
                request.leave_id === leave_id ? { ...request, request_status: 'Pending' } : request
            )
        );
        axios.put('http://localhost:5000/leave/update', { leave_id, status: 'Pending' }, { withCredentials: true })
            .catch(err => console.error(err));
    };

    return (
        <div className="m-1 p-4 bg-white shadow-md rounded-lg flex-grow">
            <table className="w-full table-auto border-collapse">
                <caption className="text-left font-sans font-semibold text-base mb-4">Employee Leave Requests</caption>
                <thead>
                    <tr className="text-left font-sans">
                        <th className="p-3 border-b-2 font-normal">Date of Application</th>
                        <th className="p-3 border-b-2 font-normal">Application Type</th>
                        <th className="p-3 border-b-2 font-normal">Duration</th>
                        <th className="p-3 border-b-2 font-normal">Employee Name</th>
                        <th className="p-3 border-b-2 font-normal">Status</th>
                        <th className="p-3 border-b-2 font-normal">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {leaveRequests.map(request => (
                        <tr key={request.id} className={request.request_status === 'Pending' ? 'bg-gray-100' : ''}>
                            <td className="p-3 border-b">{new Date(request.start_date).toLocaleDateString()}</td>
                            <td className="p-3 border-b">{request.type_name}</td>
                            <td className="p-3 border-b">{parseInt(request.duration, 10) + 1}</td>
                            <td className="p-3 border-b">{request.name}</td>
                            <td className="p-3 border-b">
                                <span
                                    className={`px-2 py-1 rounded-md text-xs ${request.request_status === 'Approved' ? 'text-blue-700 bg-blue-400' : request.request_status === 'Pending' ? 'text-yellow-700 bg-yellow-400' : 'text-red-700 bg-red-400'}`}
                                >
                                    {request.request_status}
                                </span>
                            </td>
                            <td className="p-3 border-b">
                                {request.request_status === 'Pending' ? (
                                    <>
                                        <button
                                            onClick={() => handleApproval(request.leave_id)}
                                            className="text-green-600 bg-green-200 px-2 py-1 rounded-md text-xs"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRejection(request.leave_id)}
                                            className="text-red-600 bg-red-200 px-2 py-1 rounded-md text-xs ml-2"
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleUndo(request.leave_id)}
                                        className="text-blue-600 bg-blue-200 px-4 py-2 rounded-md text-xs"
                                    >
                                        Undo
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-row space-x-4 m-3 text-xs">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-400 mr-2"></div>
                    <div>Approved</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
                    <div>Pending</div>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-400 mr-2"></div>
                    <div>Rejected</div>
                </div>
            </div>
        </div>
    );
};

export default SupervisorLeavePanel;
