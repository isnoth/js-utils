export const convertToCnNumber = (d) => {
    if (d/100000000 >= 1) {
        return `${Math.floor(d/100000000)}亿`
    }

    if (d/10000 >= 1) {
        return `${Math.floor(d/10000)}万`
    }

    return Math.floor(d).toString()
}
