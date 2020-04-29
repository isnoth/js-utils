import {uniqueArray} from './common'
import chai from 'chai'

describe('uniqueArray', ()=>{
    it('', () => {
        const a = [{a:1}, {a:2}, {a:3}]
        const b = [{a:2}, {a:3}, {a:4}]
        const expected = [{a: 1}, {a:2}, {a:3}, {a:4}]
        const result = uniqueArray(a,b, (a,b) =>a.a === b.a )
        chai.assert.equal(JSON.stringify(result), JSON.stringify(expected))
    })
})
