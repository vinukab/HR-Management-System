"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SideBar from "@/app/layouts/Sidebar";
import Titlebar from "@/app/layouts/Titlebar";
import Link from "next/link";

const Profile = ({ params }) => {
    const employee_id = params.employee_id;
    const [personalInfo, setPersonalInfo] = useState(null);
    const [officialInfo, setOfficialInfo] = useState(null);
    const [dependents, setDependents] = useState(null);
    const [emergencyContacts, setEmergencyContacts] = useState(null);

    useEffect(() => {
        if (employee_id) {
            fetchPersonalInfo();
            fetchOfficialInfo();
            fetchDependents();
            fetchEmergencyContact();
        }
    }, [employee_id]);

    const fetchPersonalInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/personal`);
            setPersonalInfo(response.data);
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    };

    const fetchOfficialInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/official`);
            setOfficialInfo(response.data);
        } catch (error) {
            console.error("Error fetching official information:", error);
        }
    };

    const fetchDependents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/dependents`);
            setDependents(response.data);
        } catch (error) {
            console.error("Error fetching dependents information:", error);
        }
    };

    const fetchEmergencyContact = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/emergency`);
            setEmergencyContacts(response.data);
        } catch (error) {
            console.error("Error fetching emergency contact information:", error);
        }
    };

    if (!personalInfo || !officialInfo || !dependents || !emergencyContacts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ml-56 bg-gray-100 flex">
            <SideBar activePanel={2} />
            <div className="flex-1">
                <div className="container">
                    <Titlebar title="User Profile" />
                    <div className="flex justify-between items-center m-5">
                        <h1 className="text-3xl font-semibold">User Profile</h1>
                    </div>

                    <div className="flex space-x-2">
                        {/* Left Column - Profile Picture and General Information */}
                        <div className="w-1/3">
                            <Card className="bg-white p-6 rounded-lg shadow-md">
                                <CardContent>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={personalInfo.profile_pic || "/default-profile.png"}
                                            alt="User Profile"
                                            className="rounded-full w-32 h-32 object-cover mb-4"
                                        />
                                        <CardTitle className="text-xl font-semibold text-center mb-2">
                                            {`${personalInfo.first_name} ${personalInfo.last_name}`}
                                        </CardTitle>
                                        <p className="text-center text-gray-600 mb-4">{officialInfo.job_title_id}</p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                <strong>Mobile:</strong>
                                                {personalInfo.phone_numbers.map((mobile, index) => (
                                                    <span key={index}>
                                                        {mobile}{index < personalInfo.phone_numbers.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </p>
                                            <p><strong>Department:</strong> {officialInfo.department_name}</p>
                                            <p><strong>Branch:</strong> {officialInfo.branch_name}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Personal, Office, Dependents, and Emergency Information */}
                        <div className="flex-1 space-y-8">
                            <Card className="bg-white p-6 rounded-lg shadow-md">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
                                    <Link href={`${employee_id}/edit/personal-info`} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Edit</Link>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                                    <div>
                                        <p><strong>NIC Number:</strong> {personalInfo.NIC_number}</p>
                                        <p><strong>Date of Birth:</strong> {personalInfo.birth_date}</p>
                                        <p><strong>Marital Status:</strong> {personalInfo.marital_status}</p>
                                        <p><strong>Gender:</strong> {personalInfo.gender}</p>
                                    </div>
                                    <div>
                                        <p><strong>Address:</strong> {personalInfo.address}</p>
                                        {/* Display Custom Attributes */}
                                        {Object.entries(personalInfo.custom_attributes).map(([key, value], index) => (
                                            <p key={index}><strong>{key}:</strong> {value}</p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white p-6 rounded-lg shadow-md">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="text-lg font-semibold">Office Information</CardTitle>

                                    <Link href={`${employee_id}/edit/job-info`} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Edit</Link>

                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                                    <div>
                                        <p><strong>Job Title:</strong> {officialInfo.job_title_name}</p>
                                        <p><strong>Pay Grade:</strong> {officialInfo.pay_grade_name}</p>
                                        <p><strong>Status:</strong> {officialInfo.status}</p>
                                    </div>
                                    <div>
                                        <p><strong>Supervisor:</strong> {officialInfo.supervisor_name || "N/A"}</p>
                                        <p><strong>Department:</strong> {officialInfo.department_name}</p>
                                        <p><strong>Branch:</strong> {officialInfo.branch_name}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white p-6 rounded-lg shadow-md">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="text-lg font-semibold">Dependents Information</CardTitle>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Edit</button>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-6 text-sm text-gray-600">
                                    {dependents.length > 0 ? (
                                        dependents.map((dependent, index) => (
                                            <div key={index} className="border-b pb-2 mb-2">
                                                <p><strong>Name:</strong> {dependent.name}</p>
                                                <p><strong>Relationship:</strong> {dependent.relationship}</p>
                                                <p><strong>Gender:</strong> {dependent.gender}</p>
                                                <p><strong>Covered by Insurance:</strong> {dependent.is_covered_by_insurance ? "Yes" : "No"}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No dependents listed.</p>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="bg-white p-6 rounded-lg shadow-md">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="text-lg font-semibold">Emergency Contact</CardTitle>
                                    <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2">Edit</button>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 gap-6 text-sm text-gray-600">
                                    {emergencyContacts.length > 0 ? (
                                        emergencyContacts.map((contact, index) => (
                                            <div key={index} className="border-b pb-2 mb-2">
                                                <p><strong>Name:</strong> {contact.name}</p>
                                                <p><strong>Relationship:</strong> {contact.relationship}</p>
                                                <p>
                                                    <strong>Phone Number:</strong>
                                                    {contact.phone_numbers.map((phoneNumber, index) => (
                                                        <span key={index}>
                                                            {phoneNumber}{index < contact.phone_numbers.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}
                                                </p>
                                                <p><strong>Address:</strong> {contact.address}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No emergency contacts listed.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
