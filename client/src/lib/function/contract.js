import { api } from '../api'
import customer from './customer'
import { sql } from './../index'

export default api('contract', {
    async create(region, city, destination, address, comment, phone, name, surname, patronymic) {
        console.log(region, city)
        await customer.create(phone, `${name} ${surname} ${patronymic}`)
        await sql`insert into contract (customer, service, destination, city, address, positions, comment)
         values (${phone}, 'КИТ', ${destination}, ${`${region.label} - ${city.label}`}, ${address}, '', ${comment})`
    }
})