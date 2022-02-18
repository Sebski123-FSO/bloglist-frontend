import React from "react";

const NewBlogForm = ({
  newBlogTitle,
  setNewBlogTitle,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogUrl,
  setNewBlogUrl,
  handleSubmit,
}) => {
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
