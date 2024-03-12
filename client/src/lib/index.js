export async function sql(query) {
    const pg = await import("pg")
    console.log(pg)
    const { Client } = pg.default
    console.log(query)
    const client = new Client()
    await client.connect()
    const res = await client.query(...query)
    await client.end()
    return res.rows
}