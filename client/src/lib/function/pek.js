import { api } from '../api'

export default api('pek', {
    async calc(to) {
        const cities = await (await fetch('https://pecom.ru/ru/calc/towns.php')).json()
        console.log(Object.getOwnPropertyNames(cities))
        const bash = cities['респ. Башкортостан']
        console.log('b', bash)
    }
})