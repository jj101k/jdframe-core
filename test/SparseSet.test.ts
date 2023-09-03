import assert from "assert"
import { PseudoMap, PseudoSet } from ".."
import { SparseSet } from "../src"

describe("Sparse-set tests", () => {
    let s: SparseSet<any>
    beforeEach(() => {
        s = new SparseSet(new PseudoMap(e => JSON.stringify(e)))
    })
    describe("Set-compatible usage", () => {
        it("can add", () => {
            s.add(1)
            s.add(2)
            assert.equal(s.has(1), true)
            assert.equal(s.has(2), true)
        })
        it("can delete", () => {
            s.add(1)
            s.delete(1)
            assert.equal(s.has(1), false)
        })
        it("can clear", () => {
            s.add(1)
            s.clear()
            assert.equal(s.has(1), false)
        })
    })
    describe("sparseValues()", () => {
        it("normally matches values()", () => {
            s.add(1)
            s.add(2)
            const v = [...s.values()]
            const sv = [...s.sparseValues()]

            assert.equal(v[0], sv[0])
            assert.equal(v[1], sv[1])
        })
        describe("gap tests", () => {
            const assertGaps = (length: number, ...gaps: number[]) => {
                const sv = [...s.sparseValues()]
                assert.equal(length, sv.length)
                for(let i = 0; i < sv.length; i++) {
                    if(gaps.includes(i)) {
                        assert(sv[i] === undefined)
                    } else {
                        assert.equal(i + 1, sv[i])
                    }
                }
            }
            it("can handle all-gap (trivial)", () => {
                s.add(1)
                s.delete(1)

                assertGaps(1, 0)
            })
            it("can handle a gap (1) at the start", () => {
                s.add(1)
                s.add(2)
                s.delete(1)

                assertGaps(2, 0)
            })
            it("can handle a gap (1) at the end", () => {
                s.add(1)
                s.add(2)
                s.delete(2)

                assertGaps(2, 1)
            })
            it("can handle a gap (1) in the middle", () => {
                s.add(1)
                s.add(2)
                s.add(3)
                s.delete(2)
                assertGaps(3, 1)

                s.clear()

                s.add(1)
                s.add(2)
                s.delete(2)
                s.add(3)

                assertGaps(3, 1)
            })
            it("can handle a gap (2) at the start", () => {
                s.add(1)
                s.add(2)
                s.add(3)
                s.delete(2)
                s.delete(1)

                assertGaps(3, 0, 1)

                s.clear()

                s.add(1)
                s.delete(1)
                s.add(2)
                s.delete(2)
                s.add(3)

                assertGaps(3, 0, 1)
            })

            it("can handle a gap (2) at the end", () => {
                s.add(1)
                s.add(2)
                s.add(3)
                s.delete(2)
                s.delete(3)

                assertGaps(3, 1, 2)

                s.clear()

                s.add(1)
                s.add(2)
                s.delete(2)
                s.add(3)
                s.delete(3)

                assertGaps(3, 1, 2)
            })
            it("can handle a gap (3) throughout", () => {
                s.add(1)
                s.add(2)
                s.add(3)
                s.delete(2)
                s.delete(3)
                s.delete(1)

                assertGaps(3, 0, 1, 2)

                s.clear()

                s.add(1)
                s.add(2)
                s.delete(1)
                s.delete(2)
                s.add(3)
                s.delete(3)

                assertGaps(3, 0, 1, 2)
            })
            it("can handle a gap (2) in the middle", () => {
                s.add(1)
                s.add(2)
                s.add(3)
                s.add(4)
                s.delete(2)
                s.delete(3)

                assertGaps(4, 1, 2)

                s.clear()

                s.add(1)
                s.add(1)
                s.add(2)
                s.delete(2)
                s.add(3)
                s.add(4)
                s.delete(3)

                assertGaps(4, 1, 2)
            })
        })
        it("is empty after clear", () => {
            s.add(1)
            s.add(2)
            s.delete(1)
            s.clear()
            const sv = [...s.sparseValues()]
            assert.equal(sv.length, 0)
        })
    })
})