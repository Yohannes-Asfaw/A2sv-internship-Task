import express, { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import mongoose ,{ConnectOptions} from 'mongoose'
import router from './Routes/routes';
import errorHandler from './middleware/error_handling';
const app = express();
app.use(express.json());

app.use(router);
app.use(errorHandler);
const MONGODB_URI = 'mongodb://127.0.0.1:27017/todo';
const connectOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any;  
mongoose.connect(MONGODB_URI, connectOptions)
.then(()=>{
    console.log('Connected to mongoDB')
})
.catch((error)=>{
    console.log('MongoDB connection error', error)
});
app.get('/',(req:ExpressRequest,res:ExpressResponse)=>{
    res.send('hello this is you r node.js server with typescript')
});
const PORT=3000;
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
});
