import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import Learn from "@/pages/Learn";
import Assessment from "@/pages/Assessment";
import Achievements from "@/pages/Achievements";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId/learn" element={<Learn />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </Router>
  );
}
