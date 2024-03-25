import { sql } from '..'
import { api } from '../api'
export default api('filter', {
    async empty() {
        return {
            category: [],
            brand: [],
            price: {
                from: (await sql`select min(price) as v from product`)[0].v,
                to: (await sql`select max(price) as v from product`)[0].v,
            },
            available: false
        }
    },
    toSql(filter) {
        return `where price >= ${filter.price.from} and price <= ${filter.price.to}`
            + (filter.category.length > 0 ? ` and category in (${filter.category.map(x => `'${x}'`).join()})` : '')
            + (filter.brand.length > 0 ? ` and brand in ${filter.brand}` : '')
            + (filter.available ? ` and available > 0` : '')

    },
    async options(filter) {
        const sqlFilter = this.toSql(filter)
        return {
            category: (await sql([`select distinct category as v from product ${sqlFilter}`])).map(x => x.v),
            brand: (await sql([`select distinct brand as v from product ${sqlFilter}`])).map(x => x.v),
            price: {
                from: (await sql([`select min(price) as v from product ${sqlFilter}`]))[0].v,
                to: (await sql([`select max(price) as v from product ${sqlFilter}`]))[0].v,
            },
            available: false
        }
    },
    async query(filter) {
        const sqlFilter = this.toSql(filter)
        return await sql([`select * from product ${sqlFilter}`])
    },
})