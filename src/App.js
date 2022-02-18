import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Title from "./components/Title";
import LoginPage from "./components/LoginPage";
import NewBlogForm from "./components/NewBlogForm";
import UserStatus from "./components/UserStatus";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("Log in to application");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    err: false,
  });

  const togglableRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const storedUserInfo = window.localStorage.getItem(
      "blogListSavedUser"
    );
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
      setTitle("Blogs");
    }
  }, []);

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    try {
      const response = await blogService.create(newBlog, user.token);
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
      setBlogs([...blogs, response]);
      togglableRef.current.toggleVisibility();
      setNotification({
        message: `blog ${response.title} has been added`,
        err: false,
      });
      setTimeout(() => {
        setNotification({ message: "", err: true });
      }, 2000);
    } catch (err) {
      setNotification({ message: err.response.data.error, err: true });
      setTimeout(() => {
        setNotification({ message: "", err: true });
      }, 2000);
    }
  };

  return (
    <>
      <Title title={title} />
      {notification.message && (
        <Notification notification={notification} />
      )}
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
          <Togglable revealText="new blog" ref={togglableRef}>
            <NewBlogForm
              handleSubmit={handleNewBlogSubmit}
              newBlogTitle={newBlogTitle}
              setNewBlogTitle={setNewBlogTitle}
              newBlogAuthor={newBlogAuthor}
              setNewBlogAuthor={setNewBlogAuthor}
              newBlogUrl={newBlogUrl}
              setNewBlogUrl={setNewBlogUrl}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
