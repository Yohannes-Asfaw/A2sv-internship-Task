const express=require('express');
const mongoose=require('mongoose');
const router = require('./Router/routers');
const app=express();
const port=3000;
mongoose.connect('mongodb://127.0.0.1:27017/task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/tasks', router);
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port} `)
})