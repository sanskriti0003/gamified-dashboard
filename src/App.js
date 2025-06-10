import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(null);

  // Gamification states
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [lastAction, setLastAction] = useState(null);

  // Progress bar & reward
  const [rewardMsg, setRewardMsg] = useState("");

  // Mood/Journal states
  const [mood, setMood] = useState("");
  const [journal, setJournal] = useState("");
  const [moodHistory, setMoodHistory] = useState([]);

  // Load user data from Firestore on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setXp(data.xp || 0);
          setLevel(data.level || 1);
          setStreak(data.streak || 0);
          setLastAction(data.lastAction || null);
          setMoodHistory(data.moodHistory || []);
        } else {
          await setDoc(userRef, {
            xp: 0,
            level: 1,
            streak: 0,
            lastAction: null,
            moodHistory: [],
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save user data to Firestore whenever it changes
  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      updateDoc(userRef, {
        xp,
        level,
        streak,
        lastAction,
        moodHistory,
      });
    }
  }, [xp, level, streak, lastAction, moodHistory, user]);

  // XP progress for current level
  const xpForNextLevel = level * 100;
  const xpProgress = ((xp % xpForNextLevel) / xpForNextLevel) * 100;

  // Simulate earning XP and streak
  const handleAction = () => {
    const newXp = xp + 10;
    let leveledUp = false;
    let newLevel = level;

    if (newXp >= level * 100) {
      newLevel = level + 1;
      setLevel(newLevel);
      setRewardMsg(`🎉 Congratulations! You reached Level ${newLevel}!`);
      leveledUp = true;
    }

    setXp(newXp);
    setLastAction(new Date().toLocaleString());
    setStreak(streak + 1);

    if (!leveledUp) setRewardMsg("");
  };

  // Mood check-in
  const handleMoodCheckIn = () => {
    if (!mood) return;
    setMoodHistory([
      ...moodHistory,
      {
        date: new Date().toLocaleString(),
        mood,
        journal,
      },
    ]);
    setMood("");
    setJournal("");
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome, {user.displayName || user.email}!</h1>
      <button
        onClick={() => signOut(auth)}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
      <div
        style={{
          margin: "40px auto",
          padding: "24px",
          maxWidth: "400px",
          border: "1px solid #eee",
          borderRadius: "12px",
          background: "#f9f9f9",
        }}
      >
        <h2>🎮 Your Dashboard</h2>
        <p><b>XP:</b> {xp}</p>
        <p><b>Level:</b> {level}</p>
        <p><b>Streak:</b> {streak} days</p>
        <p><b>Last Action:</b> {lastAction ? lastAction : "No action yet"}</p>

        {/* Progress Bar */}
        <div style={{ margin: "16px 0" }}>
          <div style={{
            height: "18px",
            width: "100%",
            background: "#e0e0e0",
            borderRadius: "10px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${xpProgress}%`,
              height: "100%",
              background: "#4f8cff",
              transition: "width 0.5s"
            }} />
          </div>
          <div style={{ fontSize: "0.95rem", marginTop: "4px" }}>
            {xp % xpForNextLevel} / {xpForNextLevel} XP to next level
          </div>
        </div>

        {/* Reward Message */}
        {rewardMsg && (
          <div style={{
            margin: "12px 0",
            padding: "10px",
            background: "#d4edda",
            color: "#155724",
            borderRadius: "6px",
            fontWeight: "bold"
          }}>
            {rewardMsg}
          </div>
        )}

        <button
          onClick={handleAction}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            background: "#4f8cff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          +10 XP (Demo Action)
        </button>
      </div>

      {/* Mood Check-in Section */}
      <div
        style={{
          margin: "20px auto",
          padding: "24px",
          maxWidth: "400px",
          border: "1px solid #eee",
          borderRadius: "12px",
          background: "#fffbe7",
        }}
      >
        <h3>Mood Check-in</h3>
        <div>
          <span
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              margin: "0 8px",
              border: mood === "😊" ? "2px solid #4f8cff" : "none",
              borderRadius: "50%",
            }}
            onClick={() => setMood("😊")}
          >
            😊
          </span>
          <span
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              margin: "0 8px",
              border: mood === "😐" ? "2px solid #4f8cff" : "none",
              borderRadius: "50%",
            }}
            onClick={() => setMood("😐")}
          >
            😐
          </span>
          <span
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              margin: "0 8px",
              border: mood === "😢" ? "2px solid #4f8cff" : "none",
              borderRadius: "50%",
            }}
            onClick={() => setMood("😢")}
          >
            😢
          </span>
        </div>
        <textarea
          placeholder="Write a short journal entry (optional)..."
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
          rows={2}
        />
        <button
          onClick={handleMoodCheckIn}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            fontSize: "14px",
            background: "#ffd966",
            color: "#333",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Submit Mood
        </button>
        <div style={{ marginTop: "16px" }}>
          <h4>Recent Mood Entries:</h4>
          {moodHistory.length === 0 && <p>No entries yet.</p>}
          {moodHistory.slice(-3).reverse().map((entry, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "1.5rem" }}>{entry.mood}</span>
              <span style={{ marginLeft: "8px", color: "#888" }}>{entry.date}</span>
              <div style={{ fontSize: "0.95rem" }}>{entry.journal}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;