const express = require('express');
const {Todos} = require("./model/Todos");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
const cors = require('cors');

const {baseUrl} = require('../constants');

const port = 3080;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

const corsOptions = {
    origin: `${baseUrl.client}`,
    credentials: true
}

app.get("/", cors(corsOptions), (req, res) => {
    res.send("Welcome to your Wix Enter exam!");
});

app.get("/user", cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId || uuidv4();
    res.cookie("userId", userId).send({id: userId});
});

app.get('/todos', cors(corsOptions), (req, res) => {
    res.send({Todos});
});

app.post('/todos', cors(corsOptions), (req, res) => {
    const userId = req.cookies?.userId;
    if (!userId) {
        res.status(403).end();
        return;
    }

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
