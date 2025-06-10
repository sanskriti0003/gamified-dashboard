// src/components/MoodCheckin.js
import React from "react";

const MoodCheckin = ({
  mood, setMood, journal, setJournal, handleMoodCheckIn, moodHistory
}) => (
  <div className="dashboard-card mood-checkin">
    <h2>Mood Check-in</h2>
    <div>
      {["😊", "😐", "😢"].map((emoji) => (
        <span
          key={emoji}
          className={`mood-emoji ${mood === emoji ? "selected" : ""}`}
          onClick={() => setMood(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
    <textarea
      placeholder="Write a short journal entry (optional)..."
      value={journal}
      onChange={(e) => setJournal(e.target.value)}
      className="journal-input"
      rows={2}
    />
    <button onClick={handleMoodCheckIn} className="mood-submit-btn">
      Submit Mood
    </button>
    <div className="recent-moods">
      <h3>Recent Mood Entries:</h3>
      {moodHistory.length === 0 && <p>No entries yet.</p>}
      {moodHistory.slice(-3).reverse().map((entry, idx) => (
        <div key={idx} className="mood-entry">
          <span className="mood-emoji-large">{entry.mood}</span>
          <span className="mood-date">{entry.date}</span>
          <div className="mood-journal">{entry.journal}</div>
        </div>
      ))}
    </div>
  </div>
);

export default MoodCheckin;