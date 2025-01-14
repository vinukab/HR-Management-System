'use client';
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

const CreateLeaveRequest = ({leaveData,setLeaveData}) => {
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
  const [leaveCount, setLeaveCount] = useState([]);
  const startDate = form.watch("start_date");
  const endDate = form.watch("end_date");

  useEffect(() => {
    axios.get('http://localhost:5000/leave/types', { withCredentials: true })
      .then(res => setLeaveTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/leave/leave-count', { withCredentials: true })
      .then(res => setLeaveCount(res.data))
      .catch(err => console.error(err));
  }, []);

  const onSubmit = async(data) => {
    const { start_date, end_date, leave_type, description } = data;
    const duration = Math.ceil((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)) + 1;

    if (leaveCount[leave_type] < duration) {
      alert(`Insufficient leave balance. Remaining leaves: ${leaveCount[leave_type]}`);
      return;
    }

    const formattedData = {
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      duration: `${duration} days`,
      leave_type,
      type_name: leaveTypes.find(type => type.leave_type_id === leave_type).type_name,
      description,
      request_status: 'Pending'
    };

    try {
      const result = await axios.post('http://localhost:5000/leave/add', formattedData, { withCredentials: true });
      alert('Leave request added successfully');
      setLeaveData([...leaveData, result.data]);
    } catch (err) {
      console.error(err);
      alert('Failed to add leave request. Please try');
    }
  };

  return (
    <Card className="m-1 bg-gray-800 text-white" style={{ height: '600px' }}>
      <CardHeader>
        <CardTitle className="text-blue-400">Create Leave Request</CardTitle>
        <CardDescription className="text-gray-300">Fill the form to create a leave request</CardDescription>
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
                  <FormLabel className="text-gray-300 mr-3">Start date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={cn("w-[280px] justify-start text-left font-normal bg-gray-800 text-gray-300", !startDate && "text-gray-300")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(new Date(startDate), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 text-white">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => form.setValue('start_date', date)}
                          initialFocus
                          className="text-gray-300"
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
                  <FormLabel className="text-gray-300 mr-3">End date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className={cn("w-[280px] justify-start text-left font-normal bg-gray-800 text-gray-300", !endDate && "text-gray-300")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(new Date(endDate), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 text-white">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => form.setValue('end_date', date)}
                          initialFocus
                          className="text-gray-300"
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
                  <FormLabel className="text-gray-300">Leave Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => form.setValue('leave_type', value)}>
                      <SelectTrigger className="bg-gray-800 text-gray-300">
                        <SelectValue placeholder="Select a leave type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-gray-300">
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
                <FormItem className="text-gray-300">
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe your leave" className="w-full bg-gray-800 text-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white rounded">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLeaveRequest;
