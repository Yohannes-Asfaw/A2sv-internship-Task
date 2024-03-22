import {Request,Response} from 'express';
import Todo,{ITodo} from '../Model/todo';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from '../config';
 

const todoSchema=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    completed:Joi.boolean().required()
})

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Authorization token is missing' });
            return;
        }

        const decoded: any = jwt.verify(token, config.jwtSecret);
        const userId = decoded.userId;

        if (!req.body) {
            res.status(400).json({ error: 'Request body is missing or invalid' });
            return;
        }

        const { error, value } = todoSchema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { title, description, completed } = value as ITodo;

        if (!title || !description || completed === undefined) {
            res.status(400).json({ error: 'Title, description, and completed are required' });
            return;
        }

        const todo: ITodo = new Todo({
            title,
            description,
            completed,
            userId: userId
        });

        const newTodo: ITodo = await todo.save();

        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Authorization token is missing' });
            return;
        }

        const decoded: any = jwt.verify(token, config.jwtSecret);
        const userId = decoded.userId;

        const todos: ITodo[] = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        console.error('Error getting todos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'Authorization token is missing' });
            return;
        }

        const decoded: any = jwt.verify(token, config.jwtSecret);
        const userId = decoded.userId;

        const { id } = req.params;
        const { error } = todoSchema.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { title, description, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );

        if (!updatedTodo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }

        if (updatedTodo.userId !== userId) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getTodoById = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Token not provided' });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId: string = decoded.userId;

    const todo: ITodo | null = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (todo.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: Todo does not belong to user' });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error('Error getting todo by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
   


export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Token not provided' });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId: string = decoded.userId;

    const deletedTodo: ITodo | null = await Todo.findById(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (deletedTodo.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized: Todo does not belong to you' });
      }
    const deletedTodo1: ITodo | null = await Todo.findByIdAndDelete(req.params.id);
    
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error:'Internal Server Error'});
  }
};


