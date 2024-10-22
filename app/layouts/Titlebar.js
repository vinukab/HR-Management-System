import { Bell, LayoutDashboard, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import User from "../models/userModel";

const Title = (userDetails) => {

  const router = useRouter();
  const signOut = async () => {
    try {
      User.logout();
        console.log('Signed out successfully');
        router.push('/');
      
      }catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-between h-20 rounded-xl px-4 bg-gradient-to-r m-1 from-indigo-500 via-purple-500 to-pink-500">
        <div className="flex items-center space-x-2 bg-white p-2 rounded-xl w-5/12 h-10 max-w-96">
          <LayoutDashboard />
          <textarea
            className="w-full h-full border-none focus:outline-none resize-none text-sm"
            placeholder="Search..."
          ></textarea>
        </div>
        <div className="flex space-x-4 text-gray-600">
          <Bell />
          <Mail />
          <Popover>
            <PopoverTrigger>
              <div className="flex flex-row items-center space-x-2">
                <Avatar>
                  <AvatarImage src="http://localhost:5000/uploads/Gaming_5000x3125.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-xs">
                  <div className="font-semibold">Thimira Sahan</div>
                  <div className="text-xs">Admin</div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-50 -ml-12">
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="">
                  <h4 className="text-sm font-semibold">@Thimira Sahan</h4>
                  <p className="text-sm">Admin</p>
                  <div className="flex items-center pt-2">
                    <Button onClick={signOut}>
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Title;
