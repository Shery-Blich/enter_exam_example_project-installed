// TodoList.js
import React, { useState } from "react";
import "./TodoList.css";
import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const TodoList = ({ todos, addTodo, updateToDo }) => {
  const [newTitle, setNewTitle] = useState([]);

  return (
    <Container maxWidth="sm">
      <br />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        data-testid="todoListing-title"
      >
        TODO list
      </Typography>
      {todos.length === 0 ? (
        <Typography
          variant="body1"
          align="center"
          data-testid="todoListing-notodosAvailable"
        >
          No todos available.
        </Typography>
      ) : (
        <List data-testid={"todoListing-list"}>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              disablePadding
              className={todo.done ? "done" : "todo"}
            >
              <ListItemText
                primary={todo.title + " - " + todo.id}
                secondary={todo.author}
                data-testid={`todoListing-todo-${todo.id}`}
              />
              <ToggleButtonGroup
                color="primary"
                value={todo.done ? "done" : "todo"}
                exclusive
                onChange={() => {
                    updateToDo(todo.id - 1, todo.title, !todo.done);
                }}
              >

                <ToggleButton  value={todo.done ? "done" : "todo"}>{todo.done ? "To Do" : "Done"}</ToggleButton>
              </ToggleButtonGroup>
            </ListItem>
          ))}
        </List>
      )}
      <Grid item xs={12}>
        <Typography variant="h6" data-testid={`todoList-addTodo-title`}>
          Add todo
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
          data-testid={`todoList-addTodo-title`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => addTodo(newTitle)}
          data-testid={`todoList-addTodo-submitBtn`}
        >
          Submit TODO
        </Button>
      </Grid>
    </Container>
  );
};

export default TodoList;
