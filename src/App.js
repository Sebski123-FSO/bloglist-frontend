import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUserInfo = window.localStorage.getItem("blogListSavedUser");
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login(username, password);
      window.localStorage.setItem("blogListSavedUser", JSON.stringify(response));
      setUser(response);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      </div>
    );
  }

  const logout = () => {
    window.localStorage.removeItem("blogListSavedUser");
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      <p>User {user.name} logged in</p>
      <button onClick={logout}>logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
