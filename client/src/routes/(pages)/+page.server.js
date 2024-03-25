import { sql } from '$lib'
import filter from '$lib/function/filter'

export async function load() {
    const f = await filter.empty()
    f.category = ['КФ', 'ПЗ']
    f.available = true
    f.price.from = 100
    const x = await filter.query(f)
    //console.log(x)
    return {
        recs: x
    }
}