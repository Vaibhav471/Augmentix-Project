let express = require('express')
let mongo=require('mongoose')
let cors=require('cors')
const bodyParser = require('body-parser');
let app= express()

app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("This is Index");
})


mongo.connect('mongodb://127.0.0.1:27017/augmentix', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error', err);
});

const taskSchema = new mongo.Schema({
    task: { type: String, required: true },
  });
  

  const Task = mongo.model('Task', taskSchema, 'tasks');

  app.post('/tasks', async (req, res) => {
    try {
      const task = new Task({
        task: req.body.task,
      });
  
      // Save the task to the database
      const savedTask = await task.save();
      res.status(201).send(savedTask);
    } catch (error) {
      res.status(400).send({ error: 'Failed to save task' });
    }
  });

  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch tasks' });
    }
  });

  app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete task' });
    }
});


  app.listen(4000,()=>{
    console.log('app running on port 4000');
})
