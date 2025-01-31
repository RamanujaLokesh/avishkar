import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import toast from "react-hot-toast";

const Login = () => {
  const { done, loading, login } = useLogin();
  const [reg_no, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reg_no === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    await login({ reg_no, password });
    if (done) {
      toast.success("Logged in successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please login with your registration number and password.
        </p>

        {done ? (
          <div className="text-center text-green-500">
            <h2 className="text-lg font-semibold">Login Successful</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Registration Number Input */}
            <div>
              <label htmlFor="reg_no" className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                id="reg_no"
                name="reg_no"
                placeholder="Enter your registration number"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={reg_no}
                onChange={(e) => setRegNo(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-between">
              <Link
                to="/forgetpassword"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
