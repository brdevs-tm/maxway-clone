import React, { useState } from "react";
import { CloseMenu, HidePassword, ShowPassword } from "../assets/img/Icons";

const LoginModal = ({ closeModal, switchModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and password are required.");
      return;
    }

    try {
      // This URL should point to an API that can verify username and password
      const response = await fetch(
        "https://6635009e9bb0df2359a382a9.mockapi.io/brdevs/login?search=" +
          username,
        {
          method: "GET", // You would need a backend to handle POST and check credentials
        }
      );
      const users = await response.json();

      // This is just a simulation: Normally you would have a more secure method to check this
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        console.log("Login successful!");
        closeModal(); // Close modal on successful login
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const isFormValid = username.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button onClick={closeModal} className="absolute top-3 right-3">
          <CloseMenu />
        </button>
        <h2 className="text-2xl font-semibold text-center">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showPassword ? <HidePassword /> : <ShowPassword />}
            </button>
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={switchModal}
            className="mt-4 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Need an account? Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
