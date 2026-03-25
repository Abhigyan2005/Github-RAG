import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginSignUp from "./pages/LoginSignUp.jsx";
import DashBoard from "./pages/DashBoard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/dashboard" element={<DashBoard/>} />
      </Routes>
    </>
  );
}

export default App;
