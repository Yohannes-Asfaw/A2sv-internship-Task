const express = require('express')
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require ('../Controller/taskcontroller.js');
const router=express.Router();
// Create a new task
router.post('/', createTask);

// Get all tasks
router.get('/', getAllTasks);

// Get task by ID
router.get('/:taskId', getTaskById);

// Update a task
router.patch('/:taskId', updateTask);

// Delete a task
router.delete('/:taskId', deleteTask);

module.exports = router;




