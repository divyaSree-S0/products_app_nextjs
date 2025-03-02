/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/**/*.{js,ts,jsx,tsx}",
      "./app/**/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          darkBg: "#171616",
          lightBg: "#1f1f1f",
        }
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwind-scrollbar-hide")],
};
