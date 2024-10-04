import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";

const LeaveRequestPanel = () => {
    const [leaveData, setLeaveData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/leaverequest', { withCredentials: true })
            .then(response => {
                const leaverequests = response.data;
                console.log(leaverequests);
                setLeaveData(leaverequests);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <Card className='m-1' style={{ height: '500px' }}>
            <CardHeader>
                <CardTitle>Employee Leave</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="text-left font-sans">
                            <TableHead className="p-3 font-normal">Date of Application</TableHead>
                            <TableHead className="p-3 font-normal">Application Type</TableHead>
                            <TableHead className="p-3 font-normal">Duration</TableHead>
                            <TableHead className="p-3 font-normal">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveData.map((leave) => (
                            <TableRow key={leave.leave_id}>
                                <TableCell className="p-3">{leave.start_date}</TableCell>
                                <TableCell className="p-3">{leave.type_name}</TableCell>
                                <TableCell className="p-3">{leave.duration}</TableCell>
                                <TableCell className="p-3">
                                    <span className={classNames({
                                        "px-2 py-1 rounded-md text-xs": true,
                                        "text-yellow-700 bg-yellow-400": leave.request_status === 'Pending',
                                        "text-red-700 bg-red-400": leave.request_status === 'Rejected',
                                        "text-blue-700 bg-blue-400": leave.request_status === 'Approved'
                                    })}>
                                        {leave.request_status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
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
            </CardFooter>
        </Card>
    );
}

export default LeaveRequestPanel;
