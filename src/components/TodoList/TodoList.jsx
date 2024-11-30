import React from "react";
import "./TodoList.css";
import { useSelector } from "react-redux";
import Todo from "../Todo/Todo";

const TodoList = () => {
  const noteList = useSelector((state) => state.note.notes);
  // console.log(noteList);
  const arr = ["random", "name"];

  return (
    <div className="todoList">
      <div className="todoList__progress">
        <h1>Tasks Progress</h1>
        <ul>
          {arr.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="todoList__completed">
        <h1>Completed Tasks</h1>
        <ul></ul>
      </div>
    </div>
  );
};

export default TodoList;
