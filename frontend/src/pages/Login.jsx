import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateSignup = () => {
    if (!form.name || !form.email || !form.password) {
      setMessage("❌ All fields are required");
      return false;
    }

    if (form.password.length < 4) {
      setMessage("❌ Password must be at least 4 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    setMessage("");

    if (isLogin) {
      // LOGIN (frontend only simulation)
      if (!form.email || !form.password) {
        setMessage("❌ Enter email and password");
        return;
      }

      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);

    } else {
      // SIGNUP
      if (!validateSignup()) return;

      setMessage("✅ Signup successful! Please login now.");

      // switch to login after signup
      setTimeout(() => {
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
        setMessage("");
      }, 1500);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      
      <h1 style={{ color: "#556b2f" }}>Planora</h1>
      <p>AI Study Planner</p>

      <div className="card" style={{ display: "inline-block" }}>

        {/* NAME (only signup) */}
        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
        )}

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p style={{ marginTop: "10px", color: "#556b2f" }}>
            {message}
          </p>
        )}

        {/* TOGGLE */}
        <p
          style={{ cursor: "pointer", color: "#556b2f", marginTop: "10px" }}
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}