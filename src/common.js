export function uniqueArray (currentData, newData, comparator) {
    return [...currentData, ...newData.filter(i=> 
        !currentData.reduce((acc, cur) => {
            return  acc || comparator(cur, i)
        }, false)
    )]
}

