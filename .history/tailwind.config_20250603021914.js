module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
// This configuration enables dark mode using a class, specifies the content paths for Tailwind CSS to scan for class names, and extends the default theme if needed. No additional plugins are included.
// Make sure to install Tailwind CSS and its dependencies in your Next.js project for this configuration to work properly.