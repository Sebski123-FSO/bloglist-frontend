import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Title from "./components/Title";
import LoginPage from "./components/LoginPage";
import NewBlogForm from "./components/NewBlogForm";
import UserStatus from "./components/UserStatus";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("Log in to application");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [notification, setNotification] = useState({ message: "", err: false });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUserInfo = window.localStorage.getItem("blogListSavedUser");
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
      setTitle("Blogs");
    }
  }, []);

  return (
    <>
      <Title title={title} />
      {notification.message && <Notification notification={notification} />}
      {user === null ? (
        <LoginPage
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
          setTitle={setTitle}
          setNotification={setNotification}
        />
      ) : (
        <div>
          <UserStatus user={user} setUser={setUser} setTitle={setTitle} />
          <NewBlogForm
            newBlogTitle={newBlogTitle}
            setNewBlogTitle={setNewBlogTitle}
            newBlogAuthor={newBlogAuthor}
            setNewBlogAuthor={setNewBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogUrl={setNewBlogUrl}
            blogs={blogs}
            setBlogs={setBlogs}
            user={user}
            setNotification={setNotification}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
