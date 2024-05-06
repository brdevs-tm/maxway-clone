import React, { useState } from "react";
import emailjs from "emailjs-com";
import qrcode from "../assets/img/qrcode.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    from_name: "", // Matches {{from_name}} in your EmailJS template
    user_email: "", // Matches an expected email placeholder, but you should have a placeholder for it in EmailJS
    message: "", // Matches {{message}}
    to_name: "br.developer19@gmail.com", // Assuming you want to send this to yourself or your business name
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pg1zt0b", // Your service ID
        "template_mu1gxom", // Your template ID
        e.target, // The form element
        "vMRalq9p-Z-2v0CRO" // Your public key (user ID)
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          alert("Message sent successfully!");
          setFormData({
            from_name: "",
            user_email: "",
            message: "",
            to_name: "",
          }); // Reset form after successful submission
        },
        (error) => {
          console.error("Failed to send email:", error.text);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="container mx-auto px-4 pt-10">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <div className="flex flex-row justify-between items-start">
        <section className="flex flex-col gap-5">
          <section className="flex flex-col p-10 gap-5 rounded-md bg-qrcode-gray">
            <img
              src={qrcode}
              className="rounded-md w-[100px] h-[100px]"
              alt="MaxWay QR Code"
            />
            <span className="text-white max-w-[240px] font-bold">
              Telegramda Sharh qoldiring yoki savol bering
            </span>
            <a href="https://t.me/maxwaymasterfood_bot" className="text-white">
              @maxwaymasterfood_bot
            </a>
          </section>
          <span className="text-2xl font-bold mb-4">Yagona aloqa markazi</span>
          <a href="tel:+998712005400">+998712005400</a>
        </section>

        <form
          className="flex flex-col bg-white w-[600px] shadow-lg rounded-lg p-8 ml-5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <div className="mb-4">
            <label
              htmlFor="from_name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="from_name"
              id="from_name"
              value={formData.from_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              value={formData.user_email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
