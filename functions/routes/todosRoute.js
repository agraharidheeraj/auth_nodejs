const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/user/todos',authMiddleware, todosController.createTodos)
router.get('/user/todos',authMiddleware, todosController.getTodosByUserId)
router.put('/user/todos/:id',authMiddleware, todosController.updateTodo)
router.delete('/user/todos/:id',authMiddleware, todosController.deleteTodoByUserId)


module.exports = router