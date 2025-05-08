import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import ratorange from "../assets/ratorange.png";
import Header from "../components/header";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Function to handle login
  // It prevents the default form submission, clears any previous error messages,
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate("/home");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Main Container
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Top Heading */}
      <h1 className="text-4xl font-bold text-[#FF7F50] mb-8 text-center">
        Welcome Back!
      </h1>

      {/* Login Card */}
      <div className="bg-white shadow-xl rounded-2xl flex max-w-5xl w-full overflow-hidden border-2 border-orange-300">
        {/* Left Side: Form */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-[#FF7F50] mb-2">
            Log in to your account
          </h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF7F50]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF7F50]"
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#FF7F50] hover:bg-[#ff6633] text-white py-2 rounded-lg font-semibold transition flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Log In"
              )}
            </button>

            <div className="text-sm mt-2 text-gray-600">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#FF7F50] font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
          </form>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 flex items-center justify-center p-6">
          <img
            src={ratorange}
            alt="Monsieur Ratatouille"
            className="w-full max-w-[350px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
