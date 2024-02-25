import { functions } from './lib/functions'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if(event.url.pathname === '/api'){
        console.log('API')
        const input = await event.request.json()
        console.log(functions, input)
        const f = functions.find(x => x.name == input.func)
        console.log(f)
        return new Response(JSON.stringify(f(...input.args)))
    }
	const response = await resolve(event)
	response.headers.set('x-custom-header', 'potato')

	return response;
}