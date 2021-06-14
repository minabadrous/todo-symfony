import React, { Component, createContext } from "react";

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { name: "do something" },
        { name: "do another" },
        { name: "do else" },
      ],
    };
  }

  // create
  createTodo(event, todo) {
    event.preventDefault();
    let todos = [...this.state.todos];
    todos.push(todo);
    this.setState({ todos });
  }

  // read
  readTodo() {}

  // update
  updateTodo() {}

  // delete
  deleteTodo() {}

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
