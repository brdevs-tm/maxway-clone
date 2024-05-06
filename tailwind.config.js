const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-purple": "rgb(81, 38, 125)",
        "qrcode-gray": "rgb(150,177,194)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        "::-webkit-scrollbar": {
          width: "6px",
          height: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(81, 38, 125)", // use Tailwind color palette
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: theme("colors.gray.100"),
          borderRadius: "10px",
        },
      });
    }),
  ],
};
