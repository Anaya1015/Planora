import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import Schedule from "./pages/Schedule";
import Streak from "./pages/streak"; // ✅ NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/streak" element={<Streak />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;