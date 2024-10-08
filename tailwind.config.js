/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        'twitter-blue': '#1DA1F2', // Custom name for the blue color  
        'dark-black': '#14171A',    // Custom name for the black color  
        'dark-gray': 'rgb(140, 130, 115)',      // Dark gray  
        'light-gray': 'rgb(157, 149, 136)',     // Light gray  
        'extra-light-gray': '#E1E8ED', // Extra light gray  
        'extra-extra-light-gray': '#F5F8FA', // Extra extra light gray 
      }
    },
  },
  plugins: [],
}

