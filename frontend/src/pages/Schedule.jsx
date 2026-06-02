export default function Schedule() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#556b2f" }}>📅 Study Schedule</h1>

      <div className="card">

        {tasks.length === 0 ? (
          <p style={{ color: "#777" }}>No schedule available yet.</p>
        ) : (
          tasks.map((t, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              📘 <b>{t.subject}</b> — {t.hours} hrs
              <br />
              📅 Deadline: {t.deadline}
              <hr />
            </div>
          ))
        )}

      </div>
    </div>
  );
}