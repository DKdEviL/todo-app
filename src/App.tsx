import React from "react";
import "./App.css";
import { Todo } from "./components/Todo";
import { Container, Typography } from "@mui/material";

export const App = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        background: "white",
        p: 2,
        my: 3,
        height: "90vh",
        borderRadius: "10px",
        overflow: 'hidden'
      }}
    >
      <Typography variant="h6" component="h6" align="center">
        Todo App
      </Typography>
      <Todo />
    </Container>
  );
};
