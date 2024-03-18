import {Request,Response} from 'express';
import Todo,{ITodo} from '../Model/todo';
import Joi from 'joi';

const todoSchema=Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    completed:Joi.boolean().required()
})

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
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
    });

    const newTodo: ITodo = await todo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getTodos=async(req:Request,res:Response):Promise<any>=>{
    try{
        const todos:ITodo[]=await Todo.find();
        res.status(200).json(todos);

    }catch (error){
        res.status(500).json({error:"Internal Srver Error"})

    };
}


export const updateTodo=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {id}=req.params;
        const{error}=todoSchema.validate(req.body);

        if (error){
            return res.status(400).json({error:error.details[0].message});

        }
        const {title,description,completed}=req.body;
        const updatedTodo=await Todo.findByIdAndUpdate(
            id,
            {title,description,completed},
            {new:true}
            
        )
        if(!updatedTodo){
            return res.status(404).json({error:'Todo not found'})

        }
        res.status(200).json(updatedTodo);

    }catch (error){
        res.status(500).json({error:'Internal Server Error'})
    
    }
};
export const getTodoById=async(req:Request,res:Response):Promise<any>=>{
    try{
        const todo:ITodo | null = await Todo.findById(req.params.id);
        if (!todo){
            res.status(404).json({error:'Todo not found'});
            return 
        }
        res.status(200).json(todo);
    } catch(error){
        res.status(500).json({error:'Internal Server Error'})

    }
}

export const deleteTodo=async(req:Request,res:Response):Promise<any>=>{
    try{
        const deletedTodo:ITodo | null = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo){
            res.status(404).json({error:'Todo not found'});
            return 
        }
        res.status(204).end();
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
        
    }
}

