import express from 'express';
import verifyToken from '../Middleware/authMiddleware';
import {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodoById,

} from '../Controller/todoController';

const router=express.Router();
router.post('/todos',verifyToken,createTodo);
router.get('/todos',verifyToken,getTodos);
router.get('/todos/:id',verifyToken,getTodoById);
router.put('/todos/:id',verifyToken,updateTodo);
router.delete('/todos/:id',verifyToken,deleteTodo);

export default router;