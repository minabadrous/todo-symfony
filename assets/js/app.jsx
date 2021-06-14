import React, { Component } from "react";
import ReactDOM from "react-dom";
import TodoTable from "./components/TodoTable";
import TodoContextProvider from "./contexts/TodoContext";

class App extends Component {
  render() {
    return <TodoTable />;
  }
}

ReactDOM.render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
  document.getElementById("root")
);
