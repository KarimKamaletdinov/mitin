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
        fontSize: make(),
        lineHeight: make(80),
        letterSpacing: make(),
        borderRadius: make(),
        variants: {
            extend: {
                borderWidth: ['focus'],
            }
        },
        boxShadow: {
            n: "2px 4px 4px #00000044",
            none: ""
        },
        extend: {
            spacing: make(2000),
            borderWidth: make(3, 1, "px"),
            outlineWidth: make(10),
            zIndex: make(100, 1, "")
        },
    },

    plugins: []
}


function make(n = 50, divide = 4, point = "rem") {
    let v = {}
    for (let i = 0; i <= n; i++) {
        v[i] = i / divide + point
    }
    return v
}