const mongoose=require('mongoose')
const TaskAchema=new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Task = mongoose.model('Task',TaskAchema)
module.exports = Task;