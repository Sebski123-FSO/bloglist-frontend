import React, { useState } from "react";
import loginService from "../services/login";

const LoginPage = ({ setUser, setTitle, createNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

export default LoginPage;
