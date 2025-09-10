import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import SuccessDisplay from "./components/SucessDisplay";
import ErrorDisplay from "./components/ErrorDisplay";

function App() {
  return (
    <>
      <Navbar />
      <SuccessDisplay/>
      <ErrorDisplay/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
