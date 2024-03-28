export default {
    currentOff(total, ip) {
        let result = 0
        console.log(total, ip)
        if (ip) {
            if (total >= 50_000) {
                result = 5
            }
            if (total >= 100_000) {
                result = 10
            }
            if (total >= 1_000_000) {
                result = 25
            }
        } else {
            if (total >= 4_500) {
                result = 10
            }
            if (total >= 10_000) {
                result = 15
            }
        }
        return result
    },

    applyOff(sum, off) {
        return Math.floor(sum - sum * off / 100)
    },

    needsBulkPrice(total, ip) {
        if (ip && total >= 4_500) {
            return true
        }
        return false
    },

    price(product, total, ip) {
        if (this.needsBulkPrice(total, ip)) {
            return product.bulk
        } else {
            return product.price
        }
    },

    sumNoOff(products, total, ip) {
        let result = 0
        for (const product of products) {
            result += this.price(product, total, ip) * product.basketCount
        }
        return result
    },

    sumOff(products, total, ip) {
        const noOff = this.sumNoOff(products, total, ip)
        const off = this.currentOff(total, ip)
        return this.applyOff(noOff, off)
    },

    sum(products, ip) {
        const noOff = this.sumNoOff(products, 0, false)
        console.log("NO OFF", noOff)
        const withOff = this.sumOff(products, noOff, ip)
        const ipNoOff = this.needsBulkPrice(noOff, ip)
            ? this.sumNoOff(products, 4500, true)
            : noOff
        return {
            noOff: ipNoOff,
            withOff,
            off: this.currentOff(noOff, ip)
        }
    }
}