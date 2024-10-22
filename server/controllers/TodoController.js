const  ToDoList = require('../models/TodoModel');
const jwt = require('jsonwebtoken');
const secretKey = '1234';

const getTodoList = async(req,res)=> {
        try {
            const token = req.cookies['user'].token;
            if (!token) return res.status(401).json({ error: 'No token found' });

            const verified = jwt.verify(token, secretKey);
            const user_id = verified.id;

            const todolist = await ToDoList.getTodoList(user_id);
            return res.status(200).json({ todolist });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: 'Invalid token' });
        }
    }

const addTodo = async(req, res)=> {
        try {
            const token = req.cookies['user'];
            if (!token) return res.status(401).json({ error: 'No token found' });

            const verified = jwt.verify(token, secretKey);
            const user_id = verified.id;
            const { todo_id, task, due_date, status } = req.body;
            const isSuccessfull = await ToDoList.addTodo(todo_id, task, due_date, status);
            if (!isSuccessfull){
                throw 'Failed to addTodo'
            }
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: err });
        }
    }

const deleteTodo = async(req, res)=> {
        try {
            const token = req.cookies['user'];
            if (!token) return res.status(401).json({ error: 'No token found' });

            jwt.verify(token, secretKey);
            const { todo_id } = req.body;

            const isSuccessfull = await ToDoList.deleteTodo(todo_id);

            if(!isSuccessfull){
                throw 'Faild to deleteTodo'
            }

        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: err });
        }
    }


module.exports = {
    getTodoList,
    addTodo,
    deleteTodo
};
