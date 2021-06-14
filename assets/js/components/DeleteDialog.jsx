import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { TodoContext } from "../contexts/TodoContext";

const DeleteDialog = (props) => {
  const hide = () => props.setDeleteConfirmationIsShown(false);
  const context = useContext(TodoContext);

  return (
    <Dialog open={props.open} fullWidth={true} maxWidth="sm">
      <DialogTitle>Are you sure you want to delete this todo?</DialogTitle>
      <DialogContent>{props.todoToDelete.name}</DialogContent>
      <DialogActions>
        <Button onClick={hide}>Cancel</Button>
        <Button
          onClick={() => {
            hide();

            context.deleteTodo({
              id: props.todoToDelete.id,
              name: props.todoToDelete.name,
            });
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setDeleteConfirmationIsShown: PropTypes.func.isRequired,
  todoToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default DeleteDialog;
