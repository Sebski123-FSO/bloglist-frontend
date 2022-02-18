import React, { useState, useImperativeHandle, forwardRef } from "react";

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
        <button onClick={toggleVisibility}>{revealText}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
