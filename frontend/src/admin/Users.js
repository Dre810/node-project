import React from "react";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", role: "user" },
    { id: 2, name: "Davis Kamau", role: "admin" }
  ];

  return (
    <div>
      <h1>Users</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
