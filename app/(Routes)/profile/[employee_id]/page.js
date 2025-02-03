"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SideBar from "@/app/layouts/Sidebar";
import Titlebar from "@/app/layouts/Titlebar";
import Link from "next/link";
import { FaUserEdit, FaPhone, FaBuilding, FaUserCircle, FaHeartbeat, FaBriefcase, FaTrash } from "react-icons/fa";

const Profile = ({ params }) => {
    const employee_id = params.employee_id;
    const [personalInfo, setPersonalInfo] = useState(null);
    const [officialInfo, setOfficialInfo] = useState(null);
    const [dependents, setDependents] = useState([]);
    const [emergencyContacts, setEmergencyContacts] = useState([]);

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
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/personal`, { withCredentials: true });
            setPersonalInfo(response.data);
        } catch (error) {
            console.error("Error fetching personal information:", error);
        }
    };

    const fetchOfficialInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/official`, { withCredentials: true });
            setOfficialInfo(response.data);
       
        } catch (error) {
            console.error("Error fetching official information:", error);
        }
    };

    const fetchDependents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/dependent/${employee_id}`, { withCredentials: true });
            setDependents(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching dependents information:", error);
        }
    };

    const fetchEmergencyContact = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employee/${employee_id}/emergency/`, { withCredentials: true });
            setEmergencyContacts(response.data);
        } catch (error) {
            console.error("Error fetching emergency contact information:", error);
        }

    };

    const deleteDependent = async (dependent_id) => {
        try {
            await axios.delete(`http://localhost:5000/dependent/${dependent_id}`, { withCredentials: true });
            setDependents(dependents.filter(dependent => dependent.dependent_id !== dependent_id));
        } catch (error) {
            console.error("Error deleting dependent:", error);
        }
    };

    const deleteEmergencyContact = async (contactId) => {
        try {
            await axios.delete(`http://localhost:5000/emergencycontact/${contactId}`, { withCredentials: true });
            setEmergencyContacts(emergencyContacts.filter(contact => contact.person_id !== contactId));
        } catch (error) {
            console.error("Error deleting emergency contact:", error);
        }
    };

    if (!personalInfo || !officialInfo || !dependents || !emergencyContacts) {
        return <div className="text-center py-10 text-blue-400">Loading...</div>;
    }

    return (
        <div className="ml-56 bg-gray-700 text-white min-h-screen">
            <SideBar activePanel={2} />
            <div className="container mx-auto p-4">
                <Titlebar title="User Profile" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">

                    {/* Left Column - Profile Picture and General Information */}
                    <Card className="flex items-center justify-center bg-gray-800 h-full border-gray-700">
                        <CardContent>
                            <div className="flex flex-col items-center">
                                <img
                                    src={personalInfo.profile_pic || "/default-profile.png"}
                                    className="rounded-full w-48 h-48 object-cover border-4 border-blue-400 mb-4"
                                />
                                <CardTitle className="text-2xl font-bold text-center mb-2 text-blue-400">
                                    {`${personalInfo.first_name} ${personalInfo.last_name}`}
                                </CardTitle>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <p><strong><FaBriefcase className="inline text-blue-400" /> Job Title ID:</strong> {officialInfo.job_title_id}</p>
                                    <p><strong><FaPhone className="inline text-blue-400" /> Mobile:</strong> {personalInfo.phone_numbers.join(", ")}</p>
                                    <p><strong><FaBuilding className="inline text-blue-400" /> Department:</strong> {officialInfo.department_name}</p>
                                    <p><strong><FaBuilding className="inline text-blue-400" /> Branch:</strong> {officialInfo.branch_name}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Column - Detailed Information */}
                    <div className="space-y-4">
                        {/* Personal Information Card */}
                        <Card className="bg-gray-800 p-6 rounded-lg shadow-lg border-gray-700">
                            <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                                <CardTitle className="text-lg font-semibold text-blue-400"><FaUserCircle className="inline mr-2" />Personal Information</CardTitle>
                                <Link href={`${employee_id}/edit/personal-info`} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">
                                    <FaUserEdit className="inline mr-1" /> Edit
                                </Link>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                                <div>
                                    <p><strong>NIC Number:</strong> {personalInfo.NIC_number}</p>
                                    <p><strong>Date of Birth:</strong> {personalInfo.birth_date?.split("T")[0]}</p>
                                    <p><strong>Marital Status:</strong> {personalInfo.marital_status}</p>
                                    <p><strong>Gender:</strong> {personalInfo.gender}</p>
                                </div>
                                <div>
                                    <p><strong>Address:</strong> {personalInfo.address}</p>
                                    {Object.entries(personalInfo.custom_attributes).map(([key, value], index) => (
                                        <p key={index}><strong>{key}:</strong> {value}</p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Office Information Card */}
                        <Card className="bg-gray-800 p-6 rounded-lg shadow-lg border-gray-700">
                            <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                                <CardTitle className="text-lg font-semibold text-blue-400"><FaBuilding className="inline mr-2" />Office Information</CardTitle>
                                <Link href={`${employee_id}/edit/job-info`} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">
                                    <FaUserEdit className="inline mr-1" /> Edit
                                </Link>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4 text-sm text-gray-300">
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
                    </div>
                    {/* Dependents Card */}
                    <Card className="bg-gray-800 p-6 rounded-lg shadow-lg border-gray-700">
                        <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                            <CardTitle className="text-lg font-semibold text-blue-400"><FaHeartbeat className="inline mr-2" />Dependents Information</CardTitle>
                            <Link href={`${employee_id}/edit/add-dependent`} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">
                                <FaUserEdit className="inline mr-1" /> Add
                            </Link>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-300">
                            {dependents.length > 0 ? (
                                dependents.map((dependent) => (
                                    <div key={dependent.dependent_id} className="border-b border-gray-600 pb-2 flex justify-between items-center">
                                        <div>
                                            <p><strong>Name:</strong> {dependent.name}</p>
                                            <p><strong>Relationship:</strong> {dependent.relationship}</p>
                                            <p><strong>Gender:</strong> {dependent.gender}</p>
                                            <p><strong>Covered by Insurance:</strong> {dependent.is_covered_by_insurance ? "Yes" : "No"}</p>
                                        </div>
                                        <button onClick={() => deleteDependent(dependent.dependent_id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No dependents listed.</p>
                            )}
                        </CardContent>
                    </Card>
                    {/* Emergency Contacts Card */}
                    <Card className="bg-gray-800 p-6 rounded-lg shadow-lg border-gray-700">
                        <CardHeader className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2 bg-gray-700 rounded-t-lg">
                            <CardTitle className="text-lg font-semibold text-blue-400"><FaPhone className="inline mr-2" />Emergency Contacts</CardTitle>
                            <Link href={`${employee_id}/edit/add-emergency-contact`} className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded">
                                <FaUserEdit className="inline mr-1" /> Add
                            </Link>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-300">
                            {emergencyContacts.length > 0 ? (
                                emergencyContacts.map((contact) => (
                                    <div key={contact.person_id} className="border-b border-gray-600 pb-2 flex justify-between items-center">
                                        <div>
                                            <p><strong>Name:</strong> {contact.name}</p>
                                            <p><strong>Relationship:</strong> {contact.relationship}</p>
                                            <p><strong>Phone Number:</strong> {
                                                contact.phone_numbers.map((number, index) => (
                                                    <span key={index}>{number}{index !== contact.phone_numbers.length - 1 ? ", " : ""}</span>
                                                ))
                                            }</p>
                                        </div>
                                        <button onClick={() => deleteEmergencyContact(contact.person_id)} className="text-red-500 hover:text-red-700">
                                            <FaTrash />
                                        </button>
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
    );
};

export default Profile;
