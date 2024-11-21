import React, { useState } from "react";
import "./ForgetPassword.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import apiKey from "../../ApiKey";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  if (error) {
    return <p className="error">{error}</p>;
  }

  // async function to send request
  async function sendRequest(email) {
    // complete this one
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to reset password");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const updatedEmail = email.replace(/[.@]/g, "");
    console.log(updatedEmail);
    sendRequest(updatedEmail);
  };
  return (
    <div className="forgetPassword">
      <h1>Forget Password? Dont worry</h1>
      <form onSubmit={submitHandler} className="forgetPassword__input">
        <div className="forgetPassword__email">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="forgetPassword__button">
          <button>{loading ? "Loading" : "Change Password"}</button>
        </div>
      </form>
      <div className="forgetPassword__text">
        <p>
          Back tos
          <Link to="/login"> Login </Link>
          Page
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
