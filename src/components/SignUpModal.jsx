import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseMenu, HidePassword, ShowPassword } from "../assets/img/Icons";

const SignUpModal = ({ closeModal, switchModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinimumLength: false,
  });

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength({
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      hasMinimumLength: newPassword.length >= 8,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(passwordStrength).every(Boolean)) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await fetch(
        "https://6635009e9bb0df2359a382a9.mockapi.io/brdevs/login",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("User registered:", result);
        closeModal(); // Close the modal on successful registration
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const isFormValid =
    username &&
    password &&
    avatar &&
    Object.values(passwordStrength).every(Boolean);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-700"
        >
          <CloseMenu />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-2">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <HidePassword /> : <ShowPassword />}
            </button>
          </div>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li
              className={`${
                passwordStrength.hasUpperCase
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              At least one uppercase letter
            </li>
            <li
              className={`${
                passwordStrength.hasNumber ? "text-green-500" : "text-red-500"
              }`}
            >
              At least one number
            </li>
            <li
              className={`${
                passwordStrength.hasSymbol ? "text-green-500" : "text-red-500"
              }`}
            >
              At least one symbol
            </li>
            <li
              className={`${
                passwordStrength.hasMinimumLength
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Minimum 8 characters long
            </li>
          </ul>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {avatar && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Register
          </button>
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <button
              onClick={switchModal}
              className="text-blue-500 hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

SignUpModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired,
};

export default SignUpModal;
