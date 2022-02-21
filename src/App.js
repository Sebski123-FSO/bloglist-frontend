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
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: "",
    err: false,
  });

  const togglableRef = useRef();

  useEffect(async () => {
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
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

  const createNotification = (message, isError = false, uptime = 3000) => {
    setNotification({
      message,
      err: isError,
    });
    setTimeout(() => {
      setNotification({ message: "", err: true });
    }, uptime);
  };

  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog, user.token);

      if (response.user === user.id) {
        response.user = {
          id: user.id,
          name: user.name,
          userName: user.userName,
        };
      }

      setBlogs(blogs.concat(response));
      togglableRef.current.toggleVisibility();
      createNotification(`blog ${response.title} has been added`);
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id, user.token);

      setBlogs(blogs.filter((blog) => blog.id !== id));
      createNotification("blog has been deleted");
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  const likeBlog = async (id, likes) => {
    try {
      const response = await blogService.updateLikes(id, likes + 1);
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: response.likes } : blog
        )
      );
    } catch (err) {
      createNotification(err.response.data.error, true);
    }
  };

  const orderedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <Title title={title} />
      {notification.message && (
        <Notification notification={notification} />
      )}
      {user === null ? (
        <LoginPage
          setUser={setUser}
          setTitle={setTitle}
          createNotification={createNotification}
        />
      ) : (
        <div>
          <UserStatus user={user} setUser={setUser} setTitle={setTitle} />
          <Togglable revealText="new blog" ref={togglableRef}>
            <NewBlogForm createBlog={createBlog} />
          </Togglable>
          <div id="content">
            {orderedBlogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={() => likeBlog(blog.id, blog.likes)}
                deleteBlog={() => deleteBlog(blog.id)}
                userName={user.userName}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
