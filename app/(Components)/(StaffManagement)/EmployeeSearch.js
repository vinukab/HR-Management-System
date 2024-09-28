import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import EmployeeCard from "./EmployeeCard";
   

const EmployeeSearch = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center justify-between">
            {/* search bar */}
            <div className="relative flex items-center space-x-2 p-2 rounded-xl w-1/2">
              <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                className="h-10 pl-10 rounded-md focus:outline-none focus:border-none"
              />
            </div>
            {/* toggle group */}
            <div className="flex ml-auto items-center space-x-4">
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="all">All</ToggleGroupItem>
                <ToggleGroupItem value="active">Active</ToggleGroupItem>
                <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
              </ToggleGroup>
            </div>
            </div>
        </CardTitle>
        <CardContent className="grid grid-cols-3">
            <EmployeeCard/>
            <EmployeeCard/>
            <EmployeeCard/>
            <EmployeeCard/>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default EmployeeSearch;
