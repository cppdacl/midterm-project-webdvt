import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppProvider } from "./contexts/AppContext"
import Home from "./pages/Home/Home"
import Space from "./pages/Space/Space"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/Login/Login"
import Unknown from "./pages/Unknown/Unknown"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import PublicRoute from "./components/PublicRoute/PublicRoute"
import './App.css'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/space/:spaceId" element={<Space />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route path="*" element={<Unknown />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App