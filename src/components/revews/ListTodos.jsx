import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../../slices/todosSlice";
import moment from "moment";
import Button from "@mui/material/Button";
import { CircularProgress, Card, Rating } from "@mui/material";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const { todos } = todosState;

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>



      <h2> You have {todos && todos.length} tasks </h2>
      {todosState.getTodosStatus === "pending" ? <CircularProgress /> : null}
      {todos.map((todo) => (
        <Card
          variant="outlined"
          sx={{
            padding: "0.7rem",
            marginBottom: "2rem",
          }}
          key={todo._id}
        >
          <h6>Rate the product here</h6>
          <Rating
          // onClick={handleSubmit}
            name="simple-controlled"
            value={todo.task}
            onChange={(e) => setTodo({ ...todo, task: e.target.value })}

          />
          <p>Added: {moment(todo.date).fromNow()}</p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setTodo({ ...todo })}
            sx={{
              fontFamily: "'Abel', 'sansSerif'",
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              marginLeft: "0.7rem",
              fontFamily: "'Abel', 'sansSerif'",
            }}
            onClick={() => handleDelete(todo._id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default ListTodos;
