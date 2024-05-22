import React from "react";
import {
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { TodoInput } from "./TodoInput";
import type { FilterValue, TODO_STATUS, TodoType } from "../utils/model";
import { TodoFilter } from "./TodoFilter";
import { TodoList } from "./TodoList";

const statuses: TODO_STATUS[] = ["PENDING", "DONE"];

export const Todo: React.FC = () => {
  const [todoList, setTodoList] = React.useState<TodoType[]>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [editing, setEditing] = React.useState<string | null>(null);
  const [isInputValid, setIsInputValid] = React.useState<boolean>(true);

  const [statusFilter, setStatusFilter] =
    React.useState<FilterValue>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if(!isInputValid && value.length >= 3){
      setIsInputValid(true);
    }
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if ( inputValue.length >= 3) {
      console.log('here we coming')
      setInputValue("");
      let updatedList = [];
      if (editing) {
        updatedList = todoList.map((todo) => {
          if (todo.id === editing) {
            const updated: TodoType = {
              title: inputValue,
              id: editing,
              status: "PENDING",
            };
            return updated;
          }
          return todo;
        });
      } else {
        updatedList = [...todoList];
        const uniqueId: string = new Date().toISOString();
        const newTodo: TodoType = {
          title: inputValue,
          id: uniqueId,
          status: "PENDING",
        };
        updatedList.push(newTodo);
      }
      setTodoList(updatedList);
      setEditing(null);
      localStorage.setItem("todo", JSON.stringify(updatedList));
    }else{
      setIsInputValid(false)
    }
  };

  const handleTodoStatus = (checked: boolean, id: string) => {
    const storedTodos = localStorage.getItem("todo");
    if(storedTodos){
      const todos: TodoType[] = JSON.parse(storedTodos);
      const updatedTodo = todos.map((todo) => {
        if (todo.id === id) {
          const update: TodoType = {
            ...todo,
            status: checked ? "DONE" : "PENDING",
          };
          return update;
        }
        return todo;
      });
      setTodoList(updatedTodo);
      localStorage.setItem("todo", JSON.stringify(updatedTodo));
    }
  };

  const handleDelete = (id: string) => {
    const newList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newList);
    localStorage.setItem("todo", JSON.stringify(newList));
  };

  const handleEditing = (id: string) => {
    const editTodo = todoList.find((todo) => todo.id === id)!;
    setInputValue(editTodo.title);
    setEditing(id);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    const filter = event.target.value;
    setStatusFilter(filter as FilterValue);
  };

  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todo");
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div style={{ height: '90%', overflow: 'hidden' }}>
      <TodoInput
        value={inputValue}
        isEditing={!!editing}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isValid={isInputValid}
      />
      <TodoFilter
        value={statusFilter}
        filters={statuses}
        onFilterChange={handleFilterChange}
      />
      <TodoList
        todos={todoList}
        filterValue={statusFilter}
        editing={editing}
        onEdit={handleEditing}
        onDelete={handleDelete}
        onTodoStatusChange={handleTodoStatus}
      />
    </div>
  );
};
