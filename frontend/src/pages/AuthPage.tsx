import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import api from "../api/api";
import { useError } from "../context/ErrorContext";
import { useSuccess } from "../context/SuccessContext";

interface FormState {
  name: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { setErrors, clearErrors } = useError();
  const { addMessage, clearMessages } = useSuccess();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!form.email.includes("@")) {
      errors.push("Please enter a valid email address.");
    }
    if (form.password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
    if (!isLogin && !form.name.trim()) {
      errors.push("Full name is required for registration.");
    }
    if (errors.length) {
      setErrors(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    clearMessages();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await api.post(endpoint, form);

      if (isLogin) {
        const token = res.data.token || res.data.data?.token;
        const user = res.data.user || res.data.data?.user;

        if (token && user) {
          login(token, user);
          addMessage("Logged in successfully!");
          navigate("/dashboard");
        } else {
          setErrors(["Invalid email or password."]);
        }
      } else {
        addMessage("Account created successfully! Please login.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err: any) {
      console.error("Auth error:", err);

      if (err.response) {
        // backend responded
        if (err.response.status === 401) {
          setErrors(["Invalid email or password."]);
        } else if (err.response.data?.message) {
          setErrors([err.response.data.message]);
        } else {
          setErrors(["Something went wrong. Please try again."]);
        }
      } else if (err.request) {
        // network / server down
        setErrors([
          "Unable to reach server. Please check your network and try again.",
        ]);
      } else {
        // unexpected
        setErrors(["An unexpected error occurred. Please try again later."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          {isLogin ? "Welcome Back 👋" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already registered?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              clearErrors();
              clearMessages();
            }}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
