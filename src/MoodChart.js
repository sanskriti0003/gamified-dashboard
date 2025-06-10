// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const moodMap = { "😊": 2, "😐": 1, "😢": 0 };
// const moodLabel = ["Sad", "Neutral", "Happy"];

// function MoodChart({ moodHistory }) {
//   // Prepare data for the chart
//   const data = moodHistory.map(entry => ({
//     date: entry.date.split(",")[0], // just the date part
//     mood: moodMap[entry.mood]
//   }));

//   return (
//     <div style={{ width: "100%", maxWidth: 500, margin: "0 auto", background: "#eef5ff", borderRadius: 12, padding: 16 }}>
//       <h3>Mood History Chart</h3>
//       {data.length === 0 ? (
//         <p>No mood data yet.</p>
//       ) : (
//         <ResponsiveContainer width="100%" height={220}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis
//               dataKey="mood"
//               ticks={[0, 1, 2]}
//               domain={[0, 2]}
//               tickFormatter={tick => moodLabel[tick]}
//             />
//             <Tooltip formatter={value => moodLabel[value]} />
//             <Line type="monotone" dataKey="mood" stroke="#4f8cff" strokeWidth={3} dot />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }

// export default MoodChart;
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const moodMap = { "😊": 2, "😐": 1, "😢": 0 };
const moodLabel = ["Sad", "Neutral", "Happy"];

function MoodChart({ moodHistory }) {
  const data = moodHistory.map(entry => ({
    date: entry.date.split(",")[0],
    mood: moodMap[entry.mood]
  }));

  return (
    <div style={{ width: "100%", maxWidth: 500, margin: "0 auto", background: "#eef5ff", borderRadius: 12, padding: 16 }}>
      <h3>Mood History Chart</h3>
      {data.length === 0 ? (
        <p>No mood data yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              dataKey="mood"
              ticks={[0, 1, 2]}
              domain={[0, 2]}
              tickFormatter={tick => moodLabel[tick]}
            />
            <Tooltip formatter={value => moodLabel[value]} />
            <Line type="monotone" dataKey="mood" stroke="#4f8cff" strokeWidth={3} dot />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MoodChart;