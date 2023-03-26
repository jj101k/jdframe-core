import assert from "assert"
import { PseudoMap } from "../src"

interface Test {
    a: string
    b: number
}

describe("Pseudo-map tests", () => {
    let pm: PseudoMap<Test, number>
    beforeEach(() => {
        pm = new PseudoMap(e => JSON.stringify(e))
    })
    it("can add", () => {
        const k = {a: "a", b: 2}
        pm.set(k, 5)
        assert.equal(pm.has(k), true)
        assert.equal(pm.get(k), 5)
    })
    it("can delete", () => {
        const k = {a: "a", b: 2}
        pm.set(k, 5)
        pm.delete(k)
        assert.equal(pm.has(k), false)
        assert.equal(pm.get(k), undefined)
    })
    it("can iterate", () => {
        const k = {a: "a", b: 2}
        pm.set(k, 5)
        let iterations = 0
        for(const [ki, vi] of pm.entries()) {
            iterations++
            assert.deepEqual(ki, k)
            assert.equal(vi, 5)
        }
        assert.equal(iterations, 1)
    })
})