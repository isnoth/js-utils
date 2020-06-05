import { uniqueArray, SimpleEventHandler } from './common'
import chai from 'chai'

it('uniqueArray', () => {
    const a = [{a:1}, {a:2}, {a:3}]
    const b = [{a:2}, {a:3}, {a:4}]
    const expected = [{a: 1}, {a:2}, {a:3}, {a:4}]
    const result = uniqueArray(a,b, (a,b) =>a.a === b.a )
    chai.assert.equal(JSON.stringify(result), JSON.stringify(expected))
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
