import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToDoList } from "./ToDoList";

export default function EmployeeToDOList() {
  const [date, setDate] = useState(new Date());

  return (
    <Card className="m-1 flex-grow h-full items-center justify-center" style={{backgroundColor: '#1f2937' }}>
      <CardHeader>
        <CardTitle className="text-blue-400">Personal Calendar</CardTitle>
        <CardDescription className="text-gray-300">Plan Your Work</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center text-gray-300">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className=""
        />
        <ToDoList />
      </CardContent>
    </Card>
  );
}
