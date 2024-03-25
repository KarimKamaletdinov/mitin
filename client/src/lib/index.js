export async function sql(query, ...args) {
    console.log(query, args)
    const pg = await import("pg")
    const { Client } = pg.default
    const client = new Client()
    await client.connect()
    const res = await client.query(joinS(query), args)
    await client.end()
    return res.rows
}

function joinS(array) {
    let result = array[0]
    for (let i = 1; i < array.length; i++) {
        result += '$' + i + array[i]
    }
    return result
}