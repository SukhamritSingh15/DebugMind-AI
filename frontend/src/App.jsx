import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import History from "./pages/History"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      </Routes>
    </div>
  )
}

export default App