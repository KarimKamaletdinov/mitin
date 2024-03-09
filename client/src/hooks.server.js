import { call } from './lib/api.js'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (event.url.pathname === '/api') {
        console.log('API')
        const input = await event.request.text()
        const output = await call(input)
        return new Response(JSON.stringify(output))
    }
    const response = await resolve(event)
    response.headers.set('x-custom-header', 'potato')

    return response
}