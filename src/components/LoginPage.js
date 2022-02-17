import React from "react";
import loginService from "../services/login";

const LoginPage = ({ username, password, setUsername, setPassword, setUser, setTitle, setNotification }) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login(username, password);
      window.localStorage.setItem("blogListSavedUser", JSON.stringify(response));
      setUser(response);
      setTitle("Blogs");
      setUsername("");
      setPassword("");
    } catch (err) {
      setNotification({ message: err.response.data.error, err: true });
      setTimeout(() => {
        setNotification({ message: "", err: true });
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input name="username" value={username} onChange={({ target }) => setUsername(target.value)}></input>
      </div>
      <div>
        Password:
        <input name="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default LoginPage;
