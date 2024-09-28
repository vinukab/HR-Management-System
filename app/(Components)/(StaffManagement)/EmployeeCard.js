
import React from 'react';
import { CardTitle, Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Avatar,AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon, Mail, Phone, Verified } from 'lucide-react';

const EmployeeCard = () => {
  return (
    <Card className="w-11/12 h-48 shadow-md m-5">
      <div className="flex flex-row">
        {/* Avatar Section */}
        <CardContent className="w-2/5 flex flex-col justify-center items-center">
          <Avatar className="w-28 h-28 m-2">
            <AvatarImage src="profile/profile_pic1.jpg" alt="profile" />
            <AvatarFallback>TS</AvatarFallback>
          </Avatar>
          <Button className="mt-2">View profile</Button>
        </CardContent>

        {/* Info Section */}
        <CardContent className="w-3/5 flex flex-col justify-center p-3">
          <CardHeader>
            <Badge className="bg-purple-300 px-3 py-1 rounded-md text-xs">Product Designer</Badge>
          </CardHeader>

          <CardTitle className="py-2 text-lg font-bold">
            Thimira Sahan
            <Verified/>
          </CardTitle>

          <CardDescription className="flex flex-row overflow-hidden whitespace-nowrap text-xs w-full mb-5">
            <div className="w-1/2 overflow-hidden text-ellipsis">
              <Phone/>
              075-3509728
            </div>
            <div className="w-1/2 mx-4 overflow-hidden text-ellipsis">
              <Mail/>
              Makandura Gonawilla
            </div>
          </CardDescription>

          <div className="flex flex-row overflow-hidden whitespace-nowrap text-xs justify-between gap-2 w-full">
            <Badge className="bg-lime-300 py-1 px-2 rounded-tr-full rounded-l-full">Level-1</Badge>
            <Badge className="bg-lime-300 py-1 px-2 rounded-tr-full rounded-l-full">Accounting</Badge>
            <Badge className="bg-lime-300 py-1 px-2 rounded-tr-full rounded-l-full">HR Admin</Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EmployeeCard;
