import * as React from "react";
import { Fab, FormHelperText, InputBase, Paper } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

type OwnProps = {
  value: string;
  onInputChange: React.ChangeEventHandler;
  onSubmit: React.MouseEventHandler;
  isEditing: boolean;
  isValid: boolean;
};

export const TodoInput: React.FC<OwnProps> = ({
  value,
  onInputChange,
  onSubmit,
  isEditing,
  isValid,
}) => {
  return (
    <>
      <Paper
        component="form"
        sx={{
          margin: "20px auto",
          p: "10px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={value}
          onChange={onInputChange}
          required={true}
          placeholder="Add new task"
          inputProps={{ "aria-label": "Add new task" }}
        />
        <Fab
          onClick={onSubmit}
          color={!value ? "default" : "primary"}
          style={{ cursor: !value ? "not-allowed" : "pointer" }}
          size="small"
          aria-label="add"
        >
          {isEditing ? <CheckIcon /> : <AddIcon />}
        </Fab>
      </Paper>
      {!isValid && (
        <FormHelperText sx={{ color: "red" }}>
          Title should be atleast 3 character long
        </FormHelperText>
      )}
    </>
  );
};
