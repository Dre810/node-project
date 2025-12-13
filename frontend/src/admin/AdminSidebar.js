import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>

      <NavLink to="/admin" end>Dashboard</NavLink>
      <NavLink to="/admin/events">Manage Events</NavLink>
      <NavLink to="/admin/bookings">Bookings</NavLink>
      <NavLink to="/admin/users">Users</NavLink>
      <NavLink to="/admin/reports">Reports</NavLink>
    </div>
  );
};

export default AdminSidebar;
