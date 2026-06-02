import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [task, setTask] = useState({
    subject: "",
    totalHours: "",
    deadline: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!task.subject || !task.totalHours || !task.deadline) {
      alert("All fields required");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("tasks")) || [];

    existing.push({
      subject: task.subject,
      totalHours: Number(task.totalHours),
      deadline: task.deadline,
      completedHours: 0,
    });

    localStorage.setItem("tasks", JSON.stringify(existing));

    alert("Task Added!");
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Task</h2>

      <input name="subject" placeholder="Subject" onChange={handleChange} />
      <input name="totalHours" type="number" placeholder="Hours" onChange={handleChange} />
      <input name="deadline" type="date" onChange={handleChange} />

      <button onClick={handleAdd} style={styles.btn}>
        Add Task
      </button>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: 50 },
  title: { color: "#556b2f" },
  btn: {
    background: "#556b2f",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "6px"
  }
};