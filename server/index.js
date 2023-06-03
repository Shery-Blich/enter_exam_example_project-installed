const express = require('express');
const {Todos} = require("./model/Todos");
const app = express();
app.use(express.json());
var bodyParser = require('body-parser')
const cors = require('cors');

const {baseUrl} = require('../constants');
const cookieParser = require("cookie-parser");

const port = 3080;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

const corsOptions = {
    origin: `${baseUrl.client}`,
    credentials: true
}

app.put('/todos/:id', cors(corsOptions), (req, res) => {
    const {todo} = req.body;

    Todos[todo.id].title = todo.title;
    Todos[todo.id].done = todo.done;

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

    const newTodo = {
        title, id: uuidv4()
    }
    Todos.push(newTodo);
    res.send({todo: newTodo}).status(200).end()
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
