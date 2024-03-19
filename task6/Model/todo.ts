import mongoose ,{Schema,Document} from 'mongoose'
export interface ITodo extends Document{
    title:String;
    description:String;
    completed:Boolean;

}
const TodoSchema:Schema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    completed:{type:Boolean,default:false}
});
export default mongoose.model<ITodo>('Todo',TodoSchema);
