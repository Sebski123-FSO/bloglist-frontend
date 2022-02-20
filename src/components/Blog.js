import React, { useState } from "react";
import PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, likeBlog, userName, deleteBlog }) => {
  const [showAllInfo, setShowAllInfo] = useState(false);

  const toggleShowAllInfo = () => setShowAllInfo(!showAllInfo);
  const ownedByUser = userName === blog.user.userName;

  const handleDeleteBlog = () => {
    if (window.confirm(`Delete note ${blog.title} by ${blog.author}?`)) {
      deleteBlog();
    }
  };

  return (
    <div style={blogStyle}>
      <div
        style={{ display: showAllInfo ? "none" : "" }}
        data-testid="basicInfo"
      >
        {blog.title} {blog.author}{" "}
        <button onClick={toggleShowAllInfo}>view</button>
      </div>
      <div style={{ display: showAllInfo ? "" : "none" }}>
        <table>
          <tbody>
            <tr>
              <td>
                {blog.title}{" "}
                <button onClick={toggleShowAllInfo}>hide</button>
              </td>
            </tr>
            <tr>
              <td>{blog.url}</td>
            </tr>
            <tr>
              <td data-testid="likes">
                {blog.likes} <button onClick={likeBlog}>like</button>
              </td>
            </tr>
            <tr>
              <td>{blog.author}</td>
            </tr>
            <tr style={{ display: ownedByUser ? "" : "none" }}>
              <td>
                <button onClick={handleDeleteBlog}>delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
