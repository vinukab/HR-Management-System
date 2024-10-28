import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Title from "@/app/layouts/Titlebar";

export default function EmployeeCreator({ onSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [profilePic, setProfilePic] = useState(null);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthDate", birthDate);
    formData.append("maritalStatus", maritalStatus);
    formData.append("NIC", NIC);
    formData.append("address", address);

    if (document.getElementById("upload").files[0]) {
      formData.append("profilePic", document.getElementById("upload").files[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/createEmployee",
        formData,{ withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const employee_id = response.data.employee_id
      setSuccess("Employee created successfully!");
      setError("");
      onSuccess(employee_id,2);
    } catch (error) {
      setError(error.response?.data || "Error creating employee");
      setSuccess("");
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Title />
      <Card className="m-1 shadow-md">
        <CardHeader>
          <CardTitle>Create Employee</CardTitle>
          <CardDescription>Fill out the form to create a new employee.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex">
            {/* Profile Picture */}
            <div className="flex flex-col p-10 w-1/3">
              <div
                className="w-72 h-72 m-5 rounded-full bg-gray-300 bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${profilePic ? URL.createObjectURL(profilePic) : '../default_profile.png'})` }}
                onClick={() => document.getElementById("upload").click()}
              />
              <input
                type="file"
                id="upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>

            {/* Form Fields */}
            <div className="flex-grow">
              <div className="m-2">
                <Label>First Name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="m-2">
                <Label>Last Name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <div className="m-2">
                <Label>Birth Date</Label>
                <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
              </div>
              <div className="m-2">
                <Label>Marital Status</Label>
                <Select onValueChange={setMaritalStatus} defaultValue={maritalStatus}>
                  <SelectTrigger className="flex items-center">
                    <span className="mr-auto">{maritalStatus}</span>
                    <span className="ml-2">▼</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="m-2">
                <Label>NIC Number</Label>
                <Input value={NIC} onChange={(e) => setNIC(e.target.value)} required />
              </div>
              <div className="m-2">
                <Label>Gender</Label>
                <Select onValueChange={setGender} defaultValue={gender}>
                  <SelectTrigger className="flex items-center">
                    <span className="mr-auto">{gender}</span>
                    <span className="ml-2">▼</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 m-2">
                <Label>Address</Label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              {error && <p className="text-red-500 m-2">{error}</p>}
              {success && <p className="text-green-500 m-2">{success}</p>}
              <div className="w-full flex flex-col">
                <Button type="submit" className="m-4 ml-auto">Create Employee</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
