import { sql } from '$lib';

export async function load(){
    console.log(process.env)
    const x = await sql`select * from product`;
    return {
        recs: x
    }
}