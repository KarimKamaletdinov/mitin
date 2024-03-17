import { api } from '../api'

const BASE = 'https://capi.tk-kit.com/1.0'
const TOKEN = 'FLqOpI-ayoqjjrTUIqWAO1F6m38qhhlj'
export default api('pek', {
    async calc(region, city) {
        const cities = await (await fetch(`${BASE}/tdd/search/by-name?token=${TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: city
            })
        })).json()
        const cityInRegion = cities.filter(x => x.region_code == region)
        console.log("CALC")

    },
    async cities(region, search) {
        const citiesBySearch = await (await fetch(`${BASE}/tdd/search/by-name?token=${TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: search
            })
        })).json()
        console.log(citiesBySearch)
        console.log("IN SEARCH")
        const citiesInRegion = citiesBySearch.filter(x => x.region_code == region)
        console.log("IN REGION")
        console.log("IN REGION", citiesInRegion)
        return citiesInRegion
    },
})