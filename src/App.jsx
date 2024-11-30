import React, { useEffect } from "react";
import "./App.css";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom.min";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import AddTodo from "./components/AddTodo/AddTodo";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "./store/Slices/authSlice";
import TodoList from "./components/TodoList/TodoList";
const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    dispatch(loginHandler(parsedUser));
  }, []);

  return (
    <div className="app">
      <Switch>
        {isAuth && (
          <Route path="/" exact>
            <AddTodo />
            <TodoList />
          </Route>
        )}
        {!isAuth && (
          <Route path="/signup">
            <Signup />
          </Route>
        )}
        {!isAuth && (
          <Route path="/login">
            <Login />
          </Route>
        )}
        {!isAuth && (
          <Route path="/forgetpassword">
            <ForgetPassword />
          </Route>
        )}
        <Route path="*">
          {!isAuth && <Redirect to="/login" />}
          {isAuth && <Redirect to="/" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
