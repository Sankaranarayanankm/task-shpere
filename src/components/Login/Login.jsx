import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import apiKey from "../../ApiKey";
import { useDispatch } from "react-redux";
import { loginHandler } from "../../store/Slices/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  if (error) {
    return <p className="error">{error}</p>;
  }

  // async function to handdle request
  async function sendRequest() {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to Login in");
      }
      const result = await response.json();
      // console.log(result);
      const obj = {
        token: result.idToken,
        email: result.email,
      };
      dispatch(loginHandler(obj));
      localStorage.setItem("user", JSON.stringify(obj));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest();
    // console.log(input);
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="login">
      <h1>Login Account</h1>
      <form onSubmit={submitHandler} className="login__form">
        <div className="login__email">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={input.email}
            onChange={changeHandler}
          />
        </div>
        <div className="login__password">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={input.password}
            onChange={changeHandler}
          />
        </div>
        <div className="login__button">
          <button>{loading ? "Loading..." : "Login"}</button>
        </div>
      </form>
      <div className="login__texts">
        <p>
          <Link to="/forgetpassword">Forget Password?</Link>
        </p>
        <p>
          Don't have an account?Signup
          <Link to="/signup"> here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
