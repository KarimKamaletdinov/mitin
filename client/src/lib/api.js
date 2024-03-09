import { browser } from '$app/environment'

let functions = {}

export function api(name, obj) {
    for (const fn in obj) {
        const id = `${name}:${obj}`
        functions[id] = obj[fn]
        obj[fn] = browser
            ? async (...args) => {
                const response = await fetch('./api', {
                    method: 'post',
                    body: JSON.stringify({ fn: id, args: args })
                })
                return await response.json()
            }
            : obj[fn]
    }
    return obj
}

export async function call(body) {
    const parsed = JSON.parse(body)
    const result = functions[parsed.fn](...parsed.args)
    return JSON.stringify(result)
}