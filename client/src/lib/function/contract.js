import { api } from '../api'
import customer from './customer'

export default api('contract', {
    async create(region, city, destination, address, comment, phone, name, surname, patronymic) {
        await customer.create(phone, `${name} ${surname} ${patronymic}`)
    }
})