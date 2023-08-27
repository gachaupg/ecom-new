import { useState } from "react";
import AddTodo from "./AddTodo";
import ListTodos from "./ListTodos";



const Main = () => {
  const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
  });

  return (
    <div className="Main">
    
      <AddTodo todo={todo} setTodo={setTodo} />
      {/* <ListTodos setTodo={setTodo} /> */}
    </div>
  );
};

export default Main;
