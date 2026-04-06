import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import SettingsPage from "./pages/SettingsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* dashboard after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* admin home panel */}
        <Route path="/home" element={<Home />} />

        <Route path="/user" element={<UserPage />} />

        <Route path="/settings" element={<SettingsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
