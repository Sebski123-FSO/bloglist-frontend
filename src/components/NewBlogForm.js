import React, { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");

    createBlog(newBlog);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
        ></input>
      </div>
      <div>
        author:
        <input
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
        ></input>
      </div>
      <div>
        url
        <input
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
        ></input>
      </div>
      <button>create</button>
    </form>
  );
};

export default NewBlogForm;
