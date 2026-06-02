import { useEffect, useState } from "react";

export default function Streak() {
  const [data, setData] = useState({ streak: 0, todayMinutes: 0 });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("streakData")) || {
      streak: 0,
      todayMinutes: 0,
    };

    setData(stored);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>🔥 Streak</h1>

        <h2>{data.streak} Days</h2>
        <p>Today: {data.todayMinutes} minutes</p>

        <p style={{ marginTop: 10, color: "#555" }}>
          ✔ 3 minutes study = 1 streak day
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef2e6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },

  card: {
    background: "white",
    padding: 30,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};