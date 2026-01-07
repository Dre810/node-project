import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./admin.css";

const AdminStats = () => {
  const stats = {
    revenue: 185000,
    tickets: 342,
    events: 8
  };

  const salesData = [
    { name: "Tech Conf", tickets: 80 },
    { name: "Music Fest", tickets: 120 },
    { name: "AI Expo", tickets: 60 },
    { name: "Comedy Night", tickets: 82 }
  ];

  return (
    <div className="admin-stats">
      <h1>Dashboard Overview</h1>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>KES {stats.revenue.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <h3>Tickets Sold</h3>
          <p>{stats.tickets}</p>
        </div>

        <div className="stat-card">
          <h3>Total Events</h3>
          <p>{stats.events}</p>
        </div>
      </div>

      <div className="chart-box">
        <h2>Tickets Sold Per Event</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tickets" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStats;
