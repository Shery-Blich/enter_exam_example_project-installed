// App.js
import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

const App = () => {
  axios.defaults.withCredentials = true;
  const baseURL = "http://localhost:3080";
  const clientUrl = "http://localhost:3000";

  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    getTodos();
    getUser();
  }, []);

  const getTodos = () => {
    axios
      .get(`${baseURL}/todos`)
      .then((response) => setTodos(response.data.Todos))
      .catch((error) => console.error(error));
  };

    const putTodo = (id, title, done) => {
        axios
            .put(
                `${baseURL}/todos/1`,
                { todo: {id, title, done} },
                {headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin" : `${clientUrl}`,
                    }, withCredentials: true }).then((response) => {
            setTodos(response.data.Todos)
        }).catch((error) => {
            console.log(error);
        });
    }

  const addTodo = (title) => {
    axios
      .post(
        `${baseURL}/todos`,
        {
          todo: { title, done: false },
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        setTodos([...todos, response.data.todo]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    axios
      .get(`${baseURL}/user`)
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <button onClick={() => putTodo(1,"Howdy!", false)}>Click me to put the first one!</button>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<TodoList todos={todos} addTodo={addTodo} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
