/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            d: '576px',
        },
        colors: {
            b: '#02242f',
            lb: '#023748',
            w: '#fff',
            c5: '#c5c5c5',
            eb: '#ebebeb',
            llb: "#657f88",
            red: "#64000c",
        },
        fontSize: makeFonts(),
        lineHeight: makeFonts(70),
        letterSpacing: makeFonts(),
        borderRadius: makeFonts(),
        variants: {
            extend: {
                borderWidth: ['focus'],
            }
        },
        boxShadow: {
            n: "2px 4px 4px #00000044"
        },
        extend: {
            spacing: makeSpacing(),
            borderWidth: makeFonts(3),
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

function makeFonts(n = 50) {
    let fonts = {}
    for (let i = 0; i <= n; i++) {
        fonts[i] = i / 4 + "rem"
    }
    return fonts
}