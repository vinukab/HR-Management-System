'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { useEffect, useState } from "react";

const formSchema = z.object({
  start_date: z.date({ required_error: "Start date is required" }),
  end_date: z.date({ required_error: "End date is required" }),
  leave_type: z.string().nonempty({ message: "Leave type is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
}).refine((data) => data.end_date > data.start_date, {
  message: "End date must be after start date",
});

const CreateLeaveRequest = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: undefined,
      end_date: undefined,
      leave_type: "",
      description: ""
    }
  });

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveCount,setLeaveCount] = useState([]);
  const startDate = form.watch("start_date");
  const endDate = form.watch("end_date");


  useEffect(() => {
    // Fetch leave types
    axios.get('http://localhost:5000/leave/types', { withCredentials: true })
      .then(res => {
        setLeaveTypes(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/leave/leave-count', { withCredentials: true })
      .then(res => {
        setLeaveCount(res.data);
      })
      .catch(err => console.error(err));
    },[]);

  const onSubmit = async(data) => {
    const { start_date, end_date, leave_type, description } = data;
    console.log(leave_type)
    // Calculate the duration of the leave request
    const duration = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)) + 1;

    // Check if the remaining leaves are sufficient
    if (leaveCount[leave_type] < duration) {
      alert(`Insufficient leave balance. Remaining leaves: ${remainingLeaves[leave_type]}`);
      return;
    }

    const formattedData = {
      start_date: format(new Date(start_date), "yyyy-MM-dd"),
      end_date: format(new Date(end_date), "yyyy-MM-dd"),
      leave_type,
      description
    };

    try {
      await axios.post('http://localhost:5000/leave/add', formattedData, { withCredentials: true });
      alert('Leave request submitted successfully');
    } catch (err) {
      alert('Failed to submit leave request. Please check remaining leaves and try again.');
    }
  };

  return (
    <Card className="m-1" style={{ height: '600px', backgroundColor: '#f8fafc' }}>
      <CardHeader>
        <CardTitle>Create Leave Request</CardTitle>
        <CardDescription>Fill the form to create a leave request</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Start date */}
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={cn("w-[280px] justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(new Date(startDate), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => form.setValue('start_date', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* End date */}
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={cn("w-[280px] justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(new Date(endDate), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => form.setValue('end_date', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Leave type */}
            <FormField
              control={form.control}
              name="leave_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => form.setValue('leave_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup label="Leave types">
                          {leaveTypes.map(leaveType => (
                            <SelectItem key={leaveType.leave_type_id} value={leaveType.leave_type_id}>
                              {leaveType.type_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe your leave" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-[#1e40af] hover:bg-[#1d4ed8] text-white rounded">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLeaveRequest;
