import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
} from "@material-ui/core";
import React, { Fragment, useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteDialog from "./DeleteDialog";

const TodoTable = () => {
  const context = useContext(TodoContext);
  const [addTodo, setAddTodo] = useState("");
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] =
    useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  return (
    <Fragment>
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
            {context.todos
              .slice()
              .reverse()
              .map((todo, index) => (
                <TableRow key={"todo " + index}>
                  <TableCell>
                    {editIsShown === todo.id ? (
                      <TextField
                        fullWidth={true}
                        value={editTodo}
                        onChange={(event) => setEditTodo(event.target.value)}
                        InputProps={{
                          endAdornment: (
                            <Fragment>
                              <IconButton
                                onClick={() => {
                                  setEditIsShown(false);
                                  context.updateTodo({
                                    id: todo.id,
                                    name: editTodo,
                                  });
                                }}
                              >
                                <DoneIcon />
                              </IconButton>
                              <IconButton onClick={() => setEditIsShown(false)}>
                                <CancelIcon />
                              </IconButton>
                            </Fragment>
                          ),
                        }}
                      />
                    ) : (
                      todo.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setEditIsShown(todo.id);
                        setEditTodo(todo.name);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteConfirmationIsShown(true);
                        setTodoToDelete(todo);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </form>

      {deleteConfirmationIsShown && (
        <DeleteDialog
          open={deleteConfirmationIsShown}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
          todoToDelete={todoToDelete}
        />
      )}
    </Fragment>
  );
};

export default TodoTable;
