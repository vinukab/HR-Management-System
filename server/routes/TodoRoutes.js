const express = require('express');
const TodoController = require('../controllers/toDoController')

const toDoRouter = express.Router();

toDoRouter.post('/addtodo', TodoController.addTodo);
toDoRouter.get('/', TodoController.getTodoList);
toDoRouter.delete('/deletetodo', TodoController.deleteTodo);

module.exports = { toDoRouter };