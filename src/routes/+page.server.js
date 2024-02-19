import { sql } from '$lib'

export async function load() {
    const x = await sql`select * from product`
    return {
        recs: x
    }
}