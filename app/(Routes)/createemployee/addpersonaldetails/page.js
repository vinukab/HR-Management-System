'use client';
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
import SideBar from "@/app/layouts/Sidebar";
import { useRouter } from "next/navigation";

export default function EmployeeCreator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [NIC, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [profilePic, setProfilePic] = useState(null);

  const [phoneNumbers, setPhoneNumbers] = useState([""]); // Array for phone numbers
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [key1, setKey1] = useState("");
  const [value1, setValue1] = useState("");
  const [key2, setKey2] = useState("");
  const [value2, setValue2] = useState("");
  const [key3, setKey3] = useState("");
  const [value3, setValue3] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthDate", birthDate);
    formData.append("maritalStatus", maritalStatus);
    formData.append("NIC", NIC);
    formData.append("address", address);
    formData.append("gender", gender);
    phoneNumbers.forEach((number, index) => {
      formData.append(`phoneNumbers[${index}]`, number); // Append each phone number
    });
    formData.append("key_1", key1);
    formData.append("value_1", value1);
    formData.append("key_2", key2);
    formData.append("value_2", value2);
    formData.append("key_3", key3);
    formData.append("value_3", value3);

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
      const employee_id = response.data.employee_id;
      setSuccess("Employee created successfully!");
      setError("");
      router.push(`/createemployee/adduserdetails/${employee_id}`);
    } catch (error) {
      console.error("Error creating employee!", error);
    }
  };

  // Function to add a new phone number input
  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  // Function to handle change in phone number input
  const handlePhoneNumberChange = (index, value) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = value;
    setPhoneNumbers(newPhoneNumbers);
  };

  // Function to remove a phone number input
  const removePhoneNumber = (index) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  return (
    <>
    <SideBar activePanel={1}/>
    <div className="ml-56 bg-gray-700">
     <Title />
      <Card className="m-1 shadow-md bg-gray-800 text-gray-200 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-50">Create Employee</CardTitle>
          <CardDescription className="text-gray-250">Fill out the form to create a new employee.</CardDescription>
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
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="bg-white text-black border-gray-700"/>
              </div>
              <div className="m-2">
                <Label>Last Name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required className="bg-white text-black border-gray-700"/>
              </div>
              <div className="m-2">
                <Label>Birth Date</Label>
                <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required className="bg-white text-black border-gray-700"/>
              </div>
              <div className="m-2">
                <Label>Marital Status</Label>
                <Select onValueChange={setMaritalStatus} defaultValue={maritalStatus}>
                  <SelectTrigger className="flex items-center text-gray-500">
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
                <Input value={NIC} onChange={(e) => setNIC(e.target.value)} required className="bg-white text-black border-gray-700"/>
              </div>
              <div className="m-2">
                <Label>Gender</Label>
                <Select onValueChange={setGender} defaultValue={gender}>
                  <SelectTrigger className="flex items-center text-gray-500">
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
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} required className="bg-white text-black border-gray-700"/>
              </div>

              {/* Phone Numbers */}
              <div className="m-2">
                <Label>Phone Numbers</Label>
                <div className="space-y-2">
                  {phoneNumbers.map((phoneNumber, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={phoneNumber}
                        onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                        placeholder={`Phone Number ${index + 1}`}
                        className="flex-grow bg-white text-black border-gray-700" // Allow the input to grow within available space
                        required 
                      />
                      <Button
                        type="button"
                        onClick={() => removePhoneNumber(index)}
                        className="bg-red-500 text-white w-10 h-10 flex justify-center items-center"
                      >
                        -
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={addPhoneNumber}
                    className="mt-2 bg-green-500 text-white w-10 h-10 flex justify-center items-center"
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Custom Attributes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Custom Attribute Key 1</Label>
                  <Input value={key1} onChange={(e) => setKey1(e.target.value)} className="bg-white text-black border-gray-700"/>
                </div>
                <div>
                  <Label>Custom Attribute Value 1</Label>
                  <Input value={value1} onChange={(e) => setValue1(e.target.value)} className="bg-white text-black border-gray-700"/>
                </div>
                <div>
                  <Label>Custom Attribute Key 2</Label>
                  <Input value={key2} onChange={(e) => setKey2(e.target.value)} className="bg-white text-black border-gray-700"/>
                </div>
                <div>
                  <Label>Custom Attribute Value 2</Label>
                  <Input value={value2} onChange={(e) => setValue2(e.target.value)} className="bg-white text-black border-gray-700"/>
                </div>
                <div>
                  <Label>Custom Attribute Key 3</Label>
                  <Input value={key3} onChange={(e) => setKey3(e.target.value)} className="bg-white text-black border-gray-700"/>
                </div>
                <div>
                  <Label>Custom Attribute Value 3</Label>
                  <Input value={value3} onChange={(e) => setValue3(e.target.value)} className="bg-white text-black border-gray-700"/>
                </div>
              </div>

              {error && <p className="text-red-500 m-2">{error}</p>}
              {success && <p className="text-green-500 m-2">{success}</p>}
              <div className="w-full flex flex-col">
                <Button type="submit" className="m-4 ml-auto bg-[#1e40af] hover:bg-[#1d4ed8]">Create Employee</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
