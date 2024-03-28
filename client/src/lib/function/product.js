import { api } from '../api'
import { sql } from "../index"

export default api("product", {
    async byId(id) {
        const result = await sql`select * from product where id = ${id}`
        return result[0]
    }
})