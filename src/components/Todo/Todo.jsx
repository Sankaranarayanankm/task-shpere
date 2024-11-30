import React from "react";
import "./Todo.css";

const Todo = ({ todo, id }) => {
  return (
    <div className="todo">
      <h4>{todo}</h4>
      <button>Delete </button>
      <button>Edit</button>
    </div>
  );
};

export default Todo;
