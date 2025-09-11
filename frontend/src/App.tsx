import "./App.css";
import "./index.css";
import { type JSX, useContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import SuccessDisplay from "./components/SucessDisplay";
import ErrorDisplay from "./components/ErrorDisplay";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/authContext";
// import ReferralForm from "./pages/ReferralForm";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />
      <SuccessDisplay />
      <ErrorDisplay />

      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
