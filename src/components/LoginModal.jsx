import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseMenu, HidePassword, ShowPassword } from "../assets/img/Icons";

const LoginModal = ({ closeModal }) => {
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
    if (Object.values(passwordStrength).includes(false)) {
      alert("Please ensure your password meets all requirements.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    if (avatar) {
      formData.append("avatar", avatar, avatar.name);
    }

    try {
      const response = await fetch(
        "https://6635009e9bb0df2359a382a9.mockapi.io/brdevs/login",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log("User registered:", result);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      onClick={() => closeModal()}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeModal} className="absolute top-3 right-3 text-lg">
          <CloseMenu />
        </button>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <HidePassword /> : <ShowPassword />}
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          {avatar && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar Preview"
                className="w-20 h-20 rounded-full mx-auto"
              />
            </div>
          )}
          <div className="text-sm space-y-1 mb-3">
            <p>Password must contain:</p>
            <ul className="text-sm list-disc pl-5">
              <li
                className={
                  passwordStrength.hasUpperCase
                    ? "text-green-500"
                    : "text-gray-500"
                }
              >
                An uppercase letter
              </li>
              <li
                className={
                  passwordStrength.hasNumber
                    ? "text-green-500"
                    : "text-gray-500"
                }
              >
                A number
              </li>
              <li
                className={
                  passwordStrength.hasSymbol
                    ? "text-green-500"
                    : "text-gray-500"
                }
              >
                A symbol
              </li>
              <li
                className={
                  passwordStrength.hasMinimumLength
                    ? "text-green-500"
                    : "text-gray-500"
                }
              >
                Minimum 8 characters
              </li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default LoginModal;
