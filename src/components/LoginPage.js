import React, { useState, useEffect } from "react";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginPage = ({ setUser, setTitle, createNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {
      setUsername("");
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login(username, password);
      window.localStorage.setItem(
        "blogListSavedUser",
        JSON.stringify(response)
      );
      setUser(response);
      setTitle("Blogs");
      setUsername("");
      setPassword("");
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        Password:
        <input
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button>Submit</button>
    </form>
  );
};

LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
};

export default LoginPage;
