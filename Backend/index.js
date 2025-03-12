const dotenv = require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const uri = process.env.MONGODB_URI;
// onsole.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: {type: Boolean, default: false}
})

const task = mongoose.model("Task", taskSchema);

// Initial landing page
app.get('/', (req, res) => {
    res.send('Hello from the backend! ');
});

// Return all tasks within the mongoose database
app.get('/tasks', async(req, res) => {  
    const tasks = await task.find();
    console.log(tasks);
    res.json(tasks);
});

// Add a task to the database
app.post('/tasks', async (req, res) => {
    const newTask = new task(req.body)
    await newTask.save();
    res.status(201).json(newTask);
});

app.put('/tasks/:id', async(req, res) => {
    const updateTask = await task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updateTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const deleteTask = await task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})