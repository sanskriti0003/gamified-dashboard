// src/components/Leaderboard.js
import React from "react";

const Leaderboard = ({ topUsers }) => (
  <div className="dashboard-card">
    <h3>🏆 Leaderboard</h3>
    <ol>
      {topUsers.map((user, idx) => (
        <li key={user.uid}>
          {user.displayName || user.email}: {user.xp} XP
        </li>
      ))}
    </ol>
  </div>
);

export default Leaderboard;