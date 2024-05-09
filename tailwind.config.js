module.exports = {
  content: ["./src/**/*.{html,js}","./src/**/*.{vue,js,ts,jsx,tsx}","./components/**/*.{html,js}","./src/**/*.js"],
  theme: {
    extend: {
      colors:{
        "weather-primary": "#00668A",
        "weather-secondary":"#004E71",
      }
    },
  fontFamily:{
      Roboto:["Roboto, sans-sarif"],
  },
  container:{
    padding:"2rem",
    center: true,
  },
  screens:{
    sm: "640px",
    md: "786px",
  },
},
  plugins: [],
};


