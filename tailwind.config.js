/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                error: {
                    '0%, 75%': { transform: 'rotate(-2deg)' },
                    '50%, 100%': { transform: 'rotate(2deg)' },
                },
            },
            animation: {
                error: 'error 0.3s ease-in-out',
            },
            fontFamily: {
                inter: ['"Inter"', 'sans-serif'],
            },
            colors: {
                background: '#141414',
                main: '#252525',
                second: '#3D3D3D',
                account: '#454545',
                character: '#878997',
                green: '#33d29b',
                red: '#FF4F79',
                date: '#C5C5C5',
                sidebar_active: '#141414',
                focus: '#202020',
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            time: '1142px',
        },
    },
    plugins: [require('daisyui')],
};
