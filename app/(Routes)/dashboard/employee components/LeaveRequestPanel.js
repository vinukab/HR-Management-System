import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";

const LeaveRequestPanel = ({ leaveData, setLeaveData }) => {
    useEffect(() => {
        axios.get('http://localhost:5000/leave/user', { withCredentials: true })
            .then(response => {
                const leaverequests = response.data;
                setLeaveData(leaverequests);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleDelete = (leaveId) => {
        axios.delete(`http://localhost:5000/leave/${leaveId}`, { withCredentials: true })
            .then(response => {
                setLeaveData(prevData => prevData.filter(leave => leave.leave_id !== leaveId));
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Card className='m-1 bg-gray-900 text-gray-100' style={{ height: '600px' }}>
            <CardHeader>
                <CardTitle className="text-white">Employee Leave</CardTitle>
            </CardHeader>
            <CardContent>
                <Table className="text-gray-100">
                    <TableHeader>
                        <TableRow className="text-left font-sans text-gray-300">
                            <TableHead className="p-3 font-normal">Date of Application</TableHead>
                            <TableHead className="p-3 font-normal">Application Type</TableHead>
                            <TableHead className="p-3 font-normal">Duration</TableHead>
                            <TableHead className="p-3 font-normal">Status</TableHead>
                            <TableHead className="p-3 font-normal">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveData.map((leave) => (
                            <TableRow key={leave.leave_id} className="text-gray-200">
                                <TableCell className="p-3">
                                    {new Date(new Date(leave.start_date).setDate(new Date(leave.start_date).getDate() + 0)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </TableCell>
                                <TableCell className="p-3">{leave.type_name}</TableCell>
                                <TableCell className="p-3">{leave.duration}</TableCell>
                                <TableCell className="p-3">
                                    <span className={classNames({
                                        "px-2 py-1 rounded-md text-xs font-semibold": true,
                                        "text-yellow-300 bg-yellow-600": leave.request_status === 'Pending',
                                        "text-red-300 bg-red-600": leave.request_status === 'Rejected',
                                        "text-blue-300 bg-blue-600": leave.request_status === 'Approved'
                                    })}>
                                        {leave.request_status}
                                    </span>
                                </TableCell>
                                <TableCell className="p-3">
                                    {leave.request_status === 'Pending' && (
                                        <button
                                            className="px-2 py-1 bg-red-600 text-white rounded-md text-xs flex items-center"
                                            onClick={() => handleDelete(leave.leave_id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                                            </svg>
                                            Delete
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row space-x-4 m-3 text-xs text-gray-300">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-600 mr-2 rounded"></div>
                        <div>Approved</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-600 mr-2 rounded"></div>
                        <div>Pending</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-600 mr-2 rounded"></div>
                        <div>Rejected</div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default LeaveRequestPanel;
