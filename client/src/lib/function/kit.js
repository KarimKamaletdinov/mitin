import { api } from '../api'

const BASE = 'https://capi.tk-kit.com/1.0'
const TOKEN = 'FLqOpI-ayoqjjrTUIqWAO1F6m38qhhlj'
export default api('kit', {
    async calc(city, delivery) {
        const calc = await (await fetch(`${BASE}/order/calculate?token=${TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                city_pickup_code: "020000100000",
                city_delivery_code: city.value,
                places: [
                    {
                        count_place: 1,
                        volume: 0.001,
                        weight: 1
                    }
                ],
                delivery: delivery ? 1 : 0,
                declared_price: 100
            }),
        })).json()
        console.log("CALC", calc)
        return calc[0].standart

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
    async addresses(city) {
        if (!city?.value) {
            return []
        }
        const geographyCity = await (await fetch(`${BASE}/geography/city/get-list?token=${TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tdd_city_code: city.value
            })
        })).json()
        console.log("CITY", city)
        console.log("GEO_CITY", geographyCity)
        if (!geographyCity || geographyCity.length == 0) {
            return []
        }
        const result = await (await fetch(`${BASE}/geography/address/get-list?token=${TOKEN}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                geography_city_id: geographyCity[0].id
            })
        })).json()
        console.log("RESULT", result)
        return result
    },
})