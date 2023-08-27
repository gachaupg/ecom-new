import { useState } from "react";
import ListTodos from "./ListTodos";
import AddTodo from "./Stock";



const NewApp = () => {
  const [todo, setTodo] = useState({
    task: "",
    isComplete: false,
  });

  return (
    <div className="NewApp">
    
      <AddTodo todo={todo} setTodo={setTodo} />
      {/* <ListTodos setTodo={setTodo} /> */}
    </div>
  );
};

export default NewApp;
