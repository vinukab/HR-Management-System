import { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';


const CreateUser = ({ employee_id,onSuccess}) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    role: 'Employee',
    employee_id: employee_id || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/createUser', user, { withCredentials: true });
      
      setUser({
        username: '',
        password: '',
        role: 'Employee',
        employee_id: employee_id || ''
      });
      onSuccess(employee_id, 4);
    } catch (error) {
      console.error('There was an error creating the user!', error);
      alert('Failed to create user.');
    }
  };

  return (
    <Card className="bg-slate-800">
      <CardHeader>
        <h2 className="text-xl font-semibold text-white">Create User</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-300">Username</Label>
            <Input
              type="text"
              name="username"
              value={user.username}
              placeholder="Username"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300">Password</Label>
            <Input
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300">Role</Label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="Admin">Admin</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Employee">Employee</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300">Employee ID</Label>
            <Input
              type="text"
              name="employee_id"
              value={user.employee_id}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              disabled
            />
          </div>

          <Button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Create User
          </Button>
        
        </form>

        <Button onClick={() => onSuccess(employee_id, 4)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Skip</Button>

      </CardContent>
    </Card>
  );
};

export default CreateUser;