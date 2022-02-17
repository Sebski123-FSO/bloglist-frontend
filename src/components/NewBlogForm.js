import React from "react";
import blogService from "../services/blogs";

const NewBlogForm = ({
  newBlogTitle,
  setNewBlogTitle,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogUrl,
  setNewBlogUrl,
  blogs,
  setBlogs,
  user,
  setNotification,
}) => {
  const handleSubmit = async (event) => {
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
      setNotification({ message: `blog ${response.title} has been added`, err: false });
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
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input value={newBlogTitle} onChange={(event) => setNewBlogTitle(event.target.value)}></input>
      </div>
      <div>
        author:
        <input value={newBlogAuthor} onChange={(event) => setNewBlogAuthor(event.target.value)}></input>
      </div>
      <div>
        url
        <input value={newBlogUrl} onChange={(event) => setNewBlogUrl(event.target.value)}></input>
      </div>
      <button>create</button>
    </form>
  );
};

export default NewBlogForm;
