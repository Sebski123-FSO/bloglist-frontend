import React from "react";
import PropTypes from "prop-types";

const UserStatus = ({ user, setUser, setTitle }) => {
  const logout = () => {
    window.localStorage.removeItem("blogListSavedUser");
    setUser(null);
    setTitle("Log in to application");
  };
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <p>User {user.name} logged in</p>
          </td>
          <td>
            <button onClick={logout}>logout</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

UserStatus.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default UserStatus;
