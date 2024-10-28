import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {ToDoList} from "./ToDoList";

export default function EmployeeToDOList() {
  const [date, setDate] = useState(new Date()) 
  return (
    <Card className="m-1 flex-grow h-full items-center justify-center" style={{ height: '500px' }}>
        <CardHeader>
          <CardTitle>Personal Calender</CardTitle>
          <CardDescription>Plan Your Work</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-center items-center">
            <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className=""
            />
            <ToDoList/>
        </CardContent>
    </Card>
  );
}
