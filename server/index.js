const express = require('express');
const {Todos} = require("./model/Todos");
const app = express();
app.use(express.json());
var bodyParser = require('body-parser')
const cors = require('cors');

const {baseUrl} = require('../constants');
let lastId = 3;

const port = 3080;
const corsOptions = {
    origin: `${baseUrl.client}`,
    credentials: true
}

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));

app.delete('/todos/:id', cors(corsOptions), (req, res) => {
    const id = req.params.id;
    const indexToEdit = Todos.findIndex(td => td.id === id);

    Todos.splice(indexToEdit, 1);
    res.send({Todos}).status(200).end()
});

app.put('/todos/:id', cors(corsOptions), (req, res) => {
    const {todo} = req.body;
    const indexToEdit = Todos.findIndex(td => td.id === todo.id);

    Todos[indexToEdit].title = todo.title;
    Todos[indexToEdit].done = todo.done;


    res.send({Todos}).status(200).end()
});


app.get("/", cors(corsOptions), (req, res) => {
    res.send("Welcome to your Wix Enter exam!");
});
app.get('/todos', cors(corsOptions), (req, res) => {
    res.send({Todos});
});

app.post('/todos', cors(corsOptions), (req, res) => {
    const {todo} = req.body;
    if (!todo) {
        res.status(400).json({message: 'Todo is missing'}).end();
        return;
    }

    const {title} = todo;
    if (!(title)) {
        res.status(400).json({message: 'Bad request'}).end();
        return;
    }

    lastId++
    const newTodo = {
        id: lastId, title: title, done: false
    }
    Todos.push(newTodo);
    res.send({todo: newTodo}).status(200).end()
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
