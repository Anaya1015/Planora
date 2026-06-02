import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [time, setTime] = useState(0);

  const intervalRef = useRef(null);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    subject: "",
    totalHours: "",
    deadline: "",
  });

  // LOAD
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(stored);
  }, []);

  const saveTasks = (data) => {
    setTasks(data);
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    saveTasks(updated);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setEditData(tasks[index]);
  };

  const saveEdit = () => {
    const updated = [...tasks];
    updated[editIndex] = {
      ...editData,
      totalHours: Number(editData.totalHours),
    };
    saveTasks(updated);
    setEditIndex(null);
  };

  // TIMER
  const startTimer = (index) => {
    if (activeTask !== null && activeTask !== index) return;

    setActiveTask(index);

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setActiveTask(null);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setActiveTask(null);
    setTime(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("runningTimer");
    navigate("/");
  };

  const formatTime = () => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>📘 Planora Dashboard</h1>

          <div style={styles.headerBtns}>
            <button style={styles.btn} onClick={() => navigate("/add-task")}>
              + Add
            </button>

            <button style={styles.btn2} onClick={() => navigate("/streak")}>
              🔥 Streak
            </button>

            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* GRID */}
        <div style={styles.grid}>
          {tasks.map((t, i) => (
            <div key={i} style={styles.card}>
              <h3 style={styles.taskTitle}>{t.subject}</h3>
              <p style={styles.meta}>⏳ {t.totalHours} hrs</p>

              {activeTask === i && (
                <div style={styles.timer}>{formatTime()}</div>
              )}

              {/* TIMER ROW */}
              <div style={styles.row}>
                <button style={styles.start} onClick={() => startTimer(i)}>
                  Start
                </button>
                <button style={styles.pause} onClick={pauseTimer}>
                  Pause
                </button>
                <button style={styles.stop} onClick={stopTimer}>
                  Stop
                </button>
              </div>

              {/* ACTION ROW */}
              <div style={styles.row}>
                <button style={styles.edit} onClick={() => openEdit(i)}>
                  Edit
                </button>
                <button style={styles.delete} onClick={() => deleteTask(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {editIndex !== null && (
          <div style={styles.modal}>
            <div style={styles.modalBox}>
              <h3>Edit Task</h3>

              <input
                style={styles.input}
                value={editData.subject}
                onChange={(e) =>
                  setEditData({ ...editData, subject: e.target.value })
                }
              />

              <input
                style={styles.input}
                type="number"
                value={editData.totalHours}
                onChange={(e) =>
                  setEditData({ ...editData, totalHours: e.target.value })
                }
              />

              <button style={styles.save} onClick={saveEdit}>
                Save
              </button>
              <button style={styles.cancel} onClick={() => setEditIndex(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= CLEAN UI ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7f2",
    padding: 20,
    fontFamily: "Arial",
  },

  container: {
    maxWidth: 1100,
    margin: "auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    color: "#2f3e1f",
  },

  headerBtns: {
    display: "flex",
    gap: 10,
  },

  btn: {
    padding: "10px 14px",
    borderRadius: 10,
    border: 0,
    background: "#556b2f",
    color: "white",
  },

  btn2: {
    padding: "10px 14px",
    borderRadius: 10,
    border: 0,
    background: "#8a9a5b",
    color: "white",
  },

  logout: {
    padding: "10px 14px",
    borderRadius: 10,
    border: 0,
    background: "#7a1f1f",
    color: "white",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 15,
  },

  card: {
    background: "white",
    padding: 16,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  taskTitle: {
    margin: 0,
    color: "#2f3e1f",
  },

  meta: {
    color: "#666",
  },

  timer: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#556b2f",
  },

  row: {
    display: "flex",
    gap: 8,
    marginTop: 10,
  },

  start: {
    flex: 1,
    padding: "8px 10px",
    background: "#556b2f",
    color: "white",
    border: 0,
    borderRadius: 8,
  },

  pause: {
    flex: 1,
    padding: "8px 10px",
    background: "#a3b18a",
    color: "white",
    border: 0,
    borderRadius: 8,
  },

  stop: {
    flex: 1,
    padding: "8px 10px",
    background: "#c0392b",
    color: "white",
    border: 0,
    borderRadius: 8,
  },

  edit: {
    flex: 1,
    padding: "8px 10px",
    background: "#d4a017",
    color: "white",
    border: 0,
    borderRadius: 8,
  },

  delete: {
    flex: 1,
    padding: "8px 10px",
    background: "#7a1f1f",
    color: "white",
    border: 0,
    borderRadius: 8,
  },

  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    width: 300,
  },

  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
  },

  save: {
    background: "#556b2f",
    color: "white",
    padding: 8,
    border: 0,
    borderRadius: 6,
    marginRight: 8,
  },

  cancel: {
    background: "#999",
    color: "white",
    padding: 8,
    border: 0,
    borderRadius: 6,
  },
};