import React, { Component, createContext } from "react";
import axios from "axios";
export const TodoContext = createContext();

export default class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.readTodo();
  }

  // create
  createTodo(event, todo) {
    event.preventDefault();

    axios
      .post("/api/todo/create", todo)
      .then((response) => {
        let todos = [...this.state.todos];
        todos.push(response.data.todo);
        this.setState({ todos });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // read
  readTodo() {
    axios
      .get("/api/todo/read")
      .then((response) => {
        this.setState({
          todos: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // update
  updateTodo(data) {
    axios
      .put("/api/todo/update/" + data.id, data)
      .then(() => {
        let todos = [...this.state.todos];
        let todo = todos.find((todo) => todo.id === data.id);

        todo.name = data.name;

        this.setState({
          todos,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // delete
  deleteTodo(data) {
    axios.delete("/api/todo/delete/" + data.id).then(() => {
      let todos = [...this.state.todos];
      let todo = todos.find((todo) => todo.id === data.id);

      todos.splice(todos.indexOf(todo), 1);

      this.setState({
        todos,
      });
    });
  }

  render() {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          createTodo: this.createTodo.bind(this),
          updateTodo: this.updateTodo.bind(this),
          deleteTodo: this.deleteTodo.bind(this),
        }}
      >
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}
