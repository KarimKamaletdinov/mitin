import { api } from '../api'

export default api('pek', {
    async calc(region, city) {
        const cities = await (await fetch('https://capi.tk-kit.com/1.0/tdd/search/by-name?token=FLqOpI-ayoqjjrTUIqWAO1F6m38qhhlj', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: city
            })
        })).json()
        const cityInRegion = cities.filter(x => x.region_code == region)
        console.log(cityInRegion)
        
    }
})