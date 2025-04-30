import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Adjust based on your backend
import ratorange from "../assets/ratorange.png";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await registerUser(name, email, password); // Adjust if needed
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Top Heading */}
      <h1 className="text-4xl font-bold text-[#FF4D8B] mb-8 text-center">
        Welcome to Crochet by Aya!
      </h1>

      {/* Sign Up Card */}
      <div className="bg-white shadow-xl rounded-2xl flex max-w-5xl w-full overflow-hidden border-2 border-pink-300">
        {/* Left Side: Form */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-[#FF4D8B] mb-2">
            Create an account
          </h2>
          <p className="text-sm text-gray-600 mb-6">Enter your details below</p>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4D8B]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4D8B]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF4D8B]"
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#FF4D8B] hover:bg-[#e9407a] text-white py-2 rounded-lg font-semibold transition"
            >
              Create Account
            </button>
            <div className="text-sm mt-2 text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#FF4D8B] font-medium cursor-pointer hover:underline"
              >
                Log in
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

export default SignupPage;
