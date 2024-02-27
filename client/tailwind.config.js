/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            d: '576px',
        },
        colors: {
            lb: '#023748',
            w: '#fff',
            c5: '#c5c5c5',
        },
        fontSize: makeFonts(),
        borderRadius: makeFonts(),
        extend: {
            spacing: makeSpacing()
        },
    },

    plugins: []
}

function makeSpacing() {
    let spacing = {}
    for (let i = 0; i < 1000; i++) {
        spacing[i] = i / 4 + "rem"
    }
    return spacing
}

function makeFonts() {
    let fonts = {}
    for (let i = 0; i < 50; i++) {
        fonts[i] = i / 4 + "rem"
    }
    return fonts
}