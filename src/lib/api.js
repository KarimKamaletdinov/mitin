import { browser } from '$app/environment';

export function api(name, func){
    const result = browser 
        ? async (...args) => {
            const response = await fetch('./api', {
                method: 'post', 
                body: JSON.stringify({func: name, args: args})
            })
            return await response.json()
        }
        : func
    Object.defineProperty(result, 'name', {value: name})
    return result
}

export const sf = api('sf', (a, b) => {
    return {
        first: a,
        second: b
    }
})
