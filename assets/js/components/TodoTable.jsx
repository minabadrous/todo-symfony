import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const TodoTable = () => {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");

  return (
    <form onSubmit={(event) => context.createTodo(event, { name: addTodo })}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                label="New Task"
                fullWidth={true}
                value={addTodo}
                onChange={(event) => setAddTodo(event.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {context.todos.slice().reverse().map((todo, index) => (
            <TableRow key={"todo " + index}>
              <TableCell>{todo.name}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
};

export default TodoTable;
