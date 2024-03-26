import { sql } from '..'
import { api } from '../api'

function toSql(filter, exclude = '') {
    return `where`
        + (exclude != 'price'
            ? ` price >= ${filter.price.from} and price <= ${filter.price.to}` : ' true')
        + (exclude != 'category' && filter.category.length > 0
            ? ` and category in (${filter.category.map(x => `'${x}'`).join()})` : '')
        + (exclude != 'brand' && filter.brand.length > 0
            ? ` and brand in (${filter.brand.map(x => `'${x}'`).join()})` : '')
        + (filter.available
            ? ` and available > 0` : '')
        + (filter.search ? searchToSql(filter.search) : '')
        + (exclude == "" && filter.order != "popular" ? ` order by ${filter.order == "cheap" ? "price"
            : filter.order == "expensive" ? "price desc"
                : "bulk - price"}` : "")

}

function searchToSql(search) {
    let andList = []
    const words = search.replace('\'', '').replace('"', '').replace('`', '').toLowerCase().split(' ')

    for (const word of words) {
        if (word.startsWith('кормушк')) {
            andList.push(`category = 'КФ'`)
        } else if (word.startsWith('фидер')) {
            andList.push(`category = 'КФ'`)
        } else if (word.startsWith('прикормк')) {
            andList.push(`category in ('ПЛ', 'ПЗ')`)
        } else if (word.startsWith('летн')) {
            andList.push(`category = 'ПЛ'`)
        } else if (word.startsWith('зимн')) {
            andList.push(`category = 'ПЗ'`)
        } else {
            let orList = []
            for (const field of ['brand', 'name']) {
                orList.push(`lower(${field}) like '%${word}%'`)
            }
            let parsed = parseInt(word)
            if (!isNaN(parsed)) {
                orList.push(`id = ${parsed}`)
            }
            andList.push(`(${orList.join(' or ')})`)
        }
    }
    let and = andList.length == 0 ? " true " : andList.join(' and ')
    return ` and (${and})`
}

export default api('filter', {
    async empty() {
        return {
            category: [],
            brand: [],
            price: {
                from: (await sql`select min(price) as v from product`)[0].v,
                to: (await sql`select max(price) as v from product`)[0].v,
            },
            available: false,
            order: "popular"
        }
    },
    async options(filter) {
        return {
            category: (await sql([`select distinct category as v from product ${toSql(filter, 'category')}`])).map(x => x.v),
            brand: (await sql([`select distinct brand as v from product ${toSql(filter, 'brand')}`])).map(x => x.v),
            price: {
                from: (await sql([`select min(price) as v from product ${toSql(filter, 'price')}`]))[0].v,
                to: (await sql([`select max(price) as v from product ${toSql(filter, 'price')}`]))[0].v,
            },
            available: false,
            order: "popular"
        }
    },
    async query(filter) {
        const sqlFilter = toSql(filter)
        return await sql([`select * from product ${sqlFilter}`])
    },
})