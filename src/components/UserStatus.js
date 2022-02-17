import React from "react";

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

export default UserStatus;
