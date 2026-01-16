/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                backgroundTop: '#0F172A',
                backgroundBottom: '#071033',
                grid: '#2A2F45',
                primary: '#0B5FFF',
                vector: '#FFD166',
                target: '#00C853',
                error: '#FF3B30',
                warning: '#FFC300',
                hint: '#8A2BE2',
                textPrimary: '#F8FAFC',
                textSecondary: '#94A3B8',
            }
        },
    },
    plugins: [],
}
