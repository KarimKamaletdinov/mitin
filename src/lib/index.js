import * as pg from 'pg'
const { Client } = pg.default


export async function sql(query){
    console.log(query)
    const client = new Client()
    await client.connect()
    const res = await client.query(...query)
    await client.end()
    return res.rows;
}