import React, { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({ revealText, children }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  const showWhenVisible = { display: visible ? "" : "none" };
  const showWhenNotVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={showWhenNotVisible}>
        <button className="toggleButton" onClick={toggleVisibility}>
          {revealText}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className="toggleButton" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  revealText: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
