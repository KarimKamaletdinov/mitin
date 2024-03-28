import { api } from '../api'

const server = api('basket', {
    async set() {

    }
})

export default {
    async list() {
        const basket = JSON.parse(localStorage.getItem("basket") ?? "{}")
        return basket
    },
    async get(productId) {
        const basket = await this.list()
        return basket[productId]
    },
    async set(productId, count) {
        const basket = await this.list()
        if (count == 0) {
            delete basket[productId]
        } else {
            basket[productId] = count
        }
        localStorage.setItem("basket", JSON.stringify(basket))
    },
}