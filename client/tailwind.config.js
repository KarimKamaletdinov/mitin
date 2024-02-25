/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            'd': '576px',
        },
        extend: {
            spacing: makeSpacing()
        }
    },

    plugins: []
}

function makeSpacing() {
    let spacing = {}
    for (let i = 0; i < 1920; i++) {
        spacing[i] = i / 4 + "rem"
    }
    return spacing
}