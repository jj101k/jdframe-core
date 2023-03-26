import assert from "assert"
import { PseudoMap, PseudoSet } from ".."

describe("Pseudo-set tests", () => {
    let ps:PseudoSet<any>
    beforeEach(() => {
        ps = new PseudoSet(new PseudoMap(e => JSON.stringify(e)))
    })
    it("can support add", () => {
        ps.add({a:1})
        assert.equal(ps.has({a:1}), true)
    })
    it("can support delete", () => {
        ps.add({a:1})
        ps.delete({a:1})
        assert.equal(ps.has({a:1}), false)
    })
    it("can iterate", () => {
        ps.add({a:1})
        assert.equal(([...ps][0] as any)?.a, 1)
    })
})