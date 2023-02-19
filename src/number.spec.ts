import { convertToCnNumber } from './number'

it ('convertToNumber', () => {
    expect(convertToCnNumber(100)).toBe('100')
})

it ('convertToNumber 万', () => {
    expect(convertToCnNumber(10000)).toBe('1万')
})

it ('convertToNumber 亿', () => {
    expect(convertToCnNumber(100000000)).toBe('1亿')
})
