import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  const style = {
    color: notification.err ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{notification.message}</div>;
};

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
};

export default Notification;
