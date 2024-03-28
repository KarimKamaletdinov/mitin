import { sql } from "$lib"

export async function load({ params: { id } }) {
    const current = (await sql`select * from product where id = ${id}`)[0]
    const same = (await sql`select * from product where brand = ${current.brand}
        and category = ${current.category} and name = ${current.name}`)
    const brand = await sql`select * from product where brand = ${current.brand} order by random() limit 4`
    console.log(brand)
    return {
        current,
        same: current.category == "КФ" ? same.map(x => ({
            id: x.id,
            title: `${x.weight}г`
        })) : [],
        brand
    }
}