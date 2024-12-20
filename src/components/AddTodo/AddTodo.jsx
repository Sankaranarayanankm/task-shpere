import React, { useState } from "react";
import "./AddTodo.css";
import { useDispatch } from "react-redux";
import { addNoteHandler } from "../../store/Slices/noteSlice";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const submitHandler = (event) => {
    event.preventDefault();
    const obj = {
      todo,
      status: "pending",
      id: new Date().getTime(),
    };
    dispatch(addNoteHandler(obj));
  };
  return (
    <div className="addTodo">
      <h1>Add Todos Here</h1>
      <form onSubmit={submitHandler} className="addTodo__form">
        <div className="addTodo__todo">
          <label htmlFor="todo">Add Todo here:</label>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            id="todo"
          />
        </div>
        <div className="addTodo__addButton">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
