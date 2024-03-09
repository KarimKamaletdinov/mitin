import { sql } from '..'
import { api } from '../api'
import bot from './bot'

export default customer = api('customer', {
    create: async (phone, name) => {
        await sql`insert into customer values (${phone}, 'ФЛ', ${name}, false)`
    },
    find: async (phone) => {
        await sql`select * from customer where phone = ${phone}`
    },
    update: async (phone, state, name, inn, document) => {
        await sql`update customer set state = ${state}, name = ${name} where phone = ${phone}`
        if (state != 'ФЛ') {
            await bot.document(document, inn)
        }
    },
    confirm: async (phone) => {
        await sql`update customer set confirmed = true where phone = ${phone}`
    },
    send: async (phone) => {
        await sql`update customer set confirmed = true where phone = ${phone}`
    },
})