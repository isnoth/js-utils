import { uniqueArray, uniqObjArrByKey, SimpleEventHandler } from './common'

it('uniqueArray', () => {
    const a = [{a:1}, {a:2}, {a:3}]
    const b = [{a:2}, {a:3}, {a:4}]
    const expected = [{a: 1}, {a:2}, {a:3}, {a:4}]
    const result = uniqueArray(a,b, (a,b) =>a.a === b.a )
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
})

it('uniqByKey', () => {
    const a = [{a:1}, {a:2}, {a:1, b:1}]
    const expected = [{a:1}, {a:2}]
    const result = uniqObjArrByKey(a, 'a')
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
})

it('#SimpleEventHandler', () => {
    const h = new SimpleEventHandler()
    const mock1 = jest.fn()
    const mock2 = jest.fn()
    const w1 = h.addEventListener('HELLO', mock1)
    const w2 = h.addEventListener('HELLO', mock2)
    h.notify('HELLO', {value: 'hello world'})
    w2.unwatch()
    expect(mock1).toHaveBeenCalledWith({value: 'hello world'})
    h.notify('HELLO', {value: 'hello world'})
    expect(mock1).toHaveBeenCalledTimes(2)
    expect(mock2).toHaveBeenCalledTimes(1)
})
