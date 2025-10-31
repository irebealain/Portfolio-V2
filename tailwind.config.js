/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#0b0c0f',
                'fg': '#E5E7EB',
                'muted': '#9CA3AF',
                'accent': '#22C55E',
                'accent-fore': '#052e16',
                'card': '#0f1115',
                'border': '#1f2937'
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'Noto Sans',
                    'sans-serif',
                ],
                display: [
                    'Space Grotesk',
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif'
                ]
            },
            boxShadow: {
                soft: '0 10px 30px -10px rgba(0,0,0,0.5)'
            }
        },
    },
    plugins: [],
}

