import express from 'express';
import {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodoById,

} from '../Controller/todoController';

const router=express.Router();
router.post('/todos',createTodo);
router.get('/todos',getTodos);
router.get('/todos/:id',getTodoById);
router.put('/todos/:id',updateTodo);
router.delete('/todos/:id',deleteTodo);

export default router;