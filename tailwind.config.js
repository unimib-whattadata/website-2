/** @type {import('tailwindcss').Config} */
tailwind.config = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // purple
                secondary: "#F97316", // orange
                accent: '#A3E635', // lime
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
} 