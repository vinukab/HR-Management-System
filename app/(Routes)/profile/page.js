import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import employeeprofile from "./employeeprofile";


const profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">User Profile</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
        </div>

        <div className="flex space-x-8">
          {/* Left Column - Profile Picture and General Information */}
          <div className="w-1/3">
            <Card className="bg-white p-6 rounded-lg shadow-md">
              <CardContent>
                <div className="flex flex-col items-center">
                  <img
                    src="/profile.jpg" // Replace with the profile image URL
                    alt="User Profile"
                    className="rounded-full w-32 h-32 object-cover mb-4"
                  />
                  <CardTitle className="text-xl font-semibold text-center mb-2">
                    Khan Muhammad Nafiul Akbor
                  </CardTitle>
                  <p className="text-center text-gray-600 mb-4">Frontend Developer</p>

                  {/* General Information */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Mobile:</strong> +880 123456789</p>
                    <p><strong>Email:</strong> martin@gmail.com</p>
                    <p><strong>Department:</strong> Tech</p>
                    <p><strong>Branch:</strong> Barikoi HQ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Personal Information and Office Information */}
          <div className="flex-1 space-y-8">
            {/* Personal Information */}
            <Card className="bg-white p-6 rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <p><strong>NID No:</strong> 5432678910</p>
                  <p><strong>Date of Birth:</strong> 04/11/1993</p>
                  <p><strong>Last Working Place:</strong> Etech</p>
                </div>
                <div>
                  <p><strong>TIN:</strong> 564738564738</p>
                  <p><strong>Blood Group:</strong> B+</p>
                  <p><strong>Gender:</strong> Male</p>
                </div>
                <div className="col-span-2">
                  <p><strong>House Address:</strong> 374/A, Free School Street, Hatirpool, Dhaka-1205</p>
                </div>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card className="bg-white p-6 rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Office Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <p><strong>Office Email:</strong> martin@barikoi.com</p>
                  <p><strong>Reporting Person:</strong> Sadman Sakib</p>
                  <p><strong>Last Working Place:</strong> Etech Solution Ltd.</p>
                </div>
                <div>
                  <p><strong>Office Phone No:</strong> +880 1738564738</p>
                  <p><strong>Gross Salary:</strong> 30,000 BDT</p>
                  <p><strong>Check-in Time:</strong> 10:00 AM</p>
                </div>
                <div className="col-span-2">
                  <p><strong>Joining Date:</strong> 01/10/2021</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;