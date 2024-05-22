import * as React from "react";
import { TodoType } from "../utils/model";
import {
    Card,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type OwnProps = {
  todos: TodoType[];
  editing: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTodoStatusChange: (checked: boolean, id: string) => void;
  filterValue?: string;
};

export const TodoList: React.FC<OwnProps> = ({
  todos,
  onEdit,
  onDelete,
  editing,
  onTodoStatusChange,
  filterValue,
}) => {
  const [todoList, setTodoList] = React.useState<TodoType[]>([]);
  React.useEffect(() => {
    if (filterValue) {
      const filteredTodo = todos.filter((todo) => todo.status === filterValue);
      setTodoList(filteredTodo);
    } else {
      setTodoList(todos);
    }
  }, [filterValue, todos]);

  return (
    <>
    <Typography variant="h6" component="h6" align="center">
        My Todos
      </Typography>
      {
        todoList.length > 0 &&  <List sx={{ width: "100%", bgcolor: "background.paper", overflow: 'auto', height: '65%' }}>
        {todoList.map((todo) => (
          <>
            <ListItem
              key={todo.id}
              style={{
                textDecoration:
                  todo.status === "DONE" ? "line-through" : "auto",
              }}
              sx={{ my: 1 }}
              divider={true}
              secondaryAction={
                <>
                  <IconButton
                    onClick={() => onEdit(todo.id)}
                    disabled={todo.status === 'DONE'}
                    edge="end"
                    color="info"
                    aria-label="edit todo"
                    sx={{ mx: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(todo.id)}
                    disabled={todo.id === editing}
                    edge="end"
                    color="error"
                    aria-label="delete todo"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemButton
                style={{ padding: "0px" }}
                disabled={todo.id === editing}
                sx={{ maxWidth: "42px", height: "42px", mr: 1    }}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <Checkbox
                    edge="start"
                    onChange={(e) => {
                      onTodoStatusChange(e.target.checked, todo.id);
                    }}
                    checked={todo.status === "DONE"}
                  />
                </ListItemIcon>
              </ListItemButton>
              <ListItemText primary={todo.title} />
            </ListItem>
          </>
        ))}
      </List>
      }
      {
        !todoList.length && <Card sx={{ height: '100px', textAlign: 'center', alignContent: 'center', m: 4}}>No Todos here!</Card>
      }
    </>
  );
};
