import { browser } from '$app/environment'

let functions = {}

export function api(name, obj) {
    for (const fn in obj) {
        const id = `${name}-${fn}`
        functions[id] = obj[fn]
        obj[fn] = browser
            ? async (...args) => {
                const response = await fetch(`./api/${id}`, {
                    method: 'post',
                    body: serializeArgs(args)
                })
                return await response.json()
            }
            : obj[fn]
    }
    return obj
}

function serializeArgs(args) {
    let body = new FormData()
    let i = 0
    for (const value of args) {
        if (value instanceof File) {
            body.append(`a-${i}`, value)
        } else {
            body.append(`a-${i}`, JSON.stringify(value))
        }
    }
    return body
}

function* parseArgs(body) {
    for (const [_, value] of body) {
        console.log(value, value instanceof File)
        if (value instanceof File) {
            yield value
        } else {
            yield JSON.parse(value)
        }
    }
}

export async function call(url, body) {
    const parsed = parseArgs(body)
    let result = functions[url.pathname.split('/')[2]](...parsed)
    if (result instanceof Promise) {
        result = await result
    }
    return JSON.stringify(result)
}