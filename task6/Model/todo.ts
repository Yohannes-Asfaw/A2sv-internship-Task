import { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
    userId: string; // Added userId field
}

const TodoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: String, required: true } // Added userId field
});

export default mongoose.model<ITodo>('Todo', TodoSchema);
