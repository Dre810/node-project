import React from "react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Events", value: 8 },
    { title: "Tickets Sold", value: 120 },
    { title: "Revenue (KES)", value: "85,000" },
    { title: "Users", value: 42 }
  ];

  return (
    <div>
      <h1>Dashboard Overview</h1>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
