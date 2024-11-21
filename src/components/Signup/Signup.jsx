import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import apiKey from "../../ApiKey";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  if (error) {
    return <p className="error">{error}</p>;
  }
  // async function to send request
  async function sendRequest() {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
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
      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest();
  };
  return (
    <div className="signup">
      <h1>Signup Here</h1>
      <form onSubmit={submitHandler} className="signup__form">
        <div className="signup__email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={input.email}
            onChange={changeHandler}
          />
        </div>
        <div className="signup__password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={input.password}
            onChange={changeHandler}
          />
        </div>
        <div className="signup__confirm">
          <label htmlFor="confirm">Confirm</label>
          <input
            type="confirm"
            name="confirm"
            id="confirm"
            value={input.confirm}
            onChange={changeHandler}
          />
        </div>
        <div className="signup__button">
          <button type="submit">{loading ? "Loading..." : "Signup"}</button>
        </div>
      </form>
      <div className="signup__texts">
        <p>
          Already have account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
