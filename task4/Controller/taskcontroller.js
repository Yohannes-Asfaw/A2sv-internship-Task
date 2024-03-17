const express= require('express')
const Task = require('../Models/task');

// Create a new task
exports.createTask = async (req,res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req,res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get task by ID
exports.getTaskById = async (req,res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req,res) => {
  try {
    const taskId = req.params.taskId;
    const { title, description, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req,res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
