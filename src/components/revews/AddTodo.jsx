import { useDispatch, useSelector } from "react-redux";
import { todosAdd, updateTodo } from "../../slices/todosSlice";
import { Button, Alert, CircularProgress, Rating, Checkbox } from "@mui/material";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../../slices/todosSlice";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { CheckBox, Label } from "@mui/icons-material";

const AddTodo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();
  const [users, setTours] = useState([]);

  // const todosState = useSelector((state) => state.todosState);
  const todosState = useSelector((state) => state.todosState);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://ecommerce-lxo3.onrender.com/api/products/find/${id}`
        );

        // res.data.sort(compare)
        // const result = res.data.filter((_, index) => index < 1);
        setTours(res.data);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const { id } = useParams();
  console.log('id',id);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo._id) {
      dispatch(updateTodo(todo));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };

      dispatch(todosAdd(newTodo));
    }

    setTodo({
      task: "",
      isComplete: true,
    });
  };
 
  const { todos } = todosState;
console.log(todo.task);
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <h6>Enter your revews</h6> */}
        {/* <input
          type="text"
          placeholder="Enter a your revews"
          value={todo.task}
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
        /> */}
        

          
        <br />
        



        {todosState.addTodoStatus === "rejected" ? (
          <Alert severity="error">{todosState.addTodoError}</Alert>
        ) : null}
        {todosState.addTodoStatus === "success" ? (
          <Alert severity="success">Task Added...</Alert>
        ) : null}
        {todosState.updateTodoStatus === "rejected" ? (
          <Alert severity="error">{todosState.updateTodoError}</Alert>
        ) : null}
        {todosState.updateTodoStatus === "success" ? (
          <Alert severity="success">Task Updated...</Alert>
        ) : null}
        {todosState.deleteTodoStatus === "rejected" ? (
          <Alert severity="error">{todosState.deleteTodoError}</Alert>
        ) : null}
        {todosState.deleteTodoStatus === "success" ? (
          <Alert severity="warning">A todo was deleted...</Alert>
        ) : null}
      



{todosState.getTodosStatus === "pending" ? <CircularProgress /> : null}

{todos.map((todo) => (
  <div>
  {id===todo._id?  <>
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
      // value={todo.task}
      onChange={(e) => setTodo({ ...todo, task: e.target.value })}

    />
    {/* <Checkbox 
    // onClick={handleSubmit}
      // name="simple-controlled"
      // value={todo.task}
      onChange={(e) => setTodo({ ...todo, isComplete:true })}

    /> */}
    {/* jj
    {todo.isComplete ==true?'hello':'none'} */}
    {/* <p>Added: {moment(todo.date).fromNow()}</p> */}
    {/* <Button
      variant="outlined"
      size="small"
      onClick={() => setTodo({ ...todo })}
      sx={{
        fontFamily: "'Abel', 'sansSerif'",
      }}
    >
      Update
    </Button> */}
   
  </Card>
    
    </>:''}
    </div>
  
))}

<Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: "0.9rem 0rem",
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
          
           Add Revews
         
        </Button>
</form>
      <div>
</div>
    </>
  );
};

export default AddTodo;
