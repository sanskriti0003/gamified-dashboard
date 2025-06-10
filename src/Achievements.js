// src/components/Achievements.js
import React from "react";

const badgeMap = {
  level5: "🎯 Level 5",
  level10: "🎯 Level 10",
  streak7: "🔥 7 Day Streak",
  streak30: "🔥 30 Day Streak"
};

const Achievements = ({ achievements }) => (
  <div className="dashboard-card">
    <h3>Achievements</h3>
    <div className="achievements-grid">
      {achievements.length === 0 && <p>No achievements yet.</p>}
      {achievements.map((ach, idx) => (
        <span key={idx} className="achievement-badge">
          {badgeMap[ach] || ach}
        </span>
      ))}
    </div>
  </div>
);

export default Achievements;