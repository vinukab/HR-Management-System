"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { set } from "date-fns"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export function ToDoList() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("")
  const [removedTask, setRemovedTask] = useState(null)
  const [user_id, setUser_id] = useState(null)


  useEffect(() => {
    axios.get('http://localhost:5000/todolist', {withCredentials: true}).then(response => {
      const {todolist} = response.data
      setTasks(todolist)
      setUser_id(todolist[0].user_id)
      console.log(todolist)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  const handleCheck = (todo_id) => {
    const checkedTask = tasks.find((task) => task.todo_id === todo_id)
    if (checkedTask) {
      setRemovedTask(checkedTask)
      setTasks((prevTasks) => prevTasks.filter((task) => task.todo_id !== todo_id))
      setTimeout(() => {
        setRemovedTask(null)
        axios.delete('http://localhost:5000/todolist', {
          data: { todo_id },
          withCredentials: true,
        }).catch(err => {
          console.error(err)
        });
      }, 5000)
    }
  }

  const handleUndo = () => {
    if (removedTask) {
      setTasks((prevTasks) => [removedTask, ...prevTasks])
      setRemovedTask(null)
    }
  }

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskdata = { todo_id: uuidv4(), 
        user_id: user_id,
        task: newTask,
        due_date: "2024-09-19",
        status: false
       };
      setTasks((prevTasks) => [
        ...prevTasks,
        newTaskdata
      ])
      axios.post('http://localhost:5000/todolist', newTaskdata, { withCredentials: true })
      .catch(err => {
        console.error(err);
      });
      setNewTask("")
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" className="ml-2" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Complete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length ? (
              tasks.map((task) => (
                <TableRow key={task.todo_id}>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={task.isChecked}
                      onCheckedChange={() => handleCheck(task.todo_id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No tasks available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Undo button, visible only if there's a removed task */}
      {removedTask && (
            <div className="m-2 text-sm">
                <p>
                    Task "{removedTask.task}" removed.{" "}
                    <Button variant="link" onClick={handleUndo} className='text-sm'>
                    Undo
                    </Button>
                </p>
            </div>
      )}
    </div>
  )
}
