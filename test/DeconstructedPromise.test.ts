import assert from "assert"
import { DeconstructedPromise, Timeout } from "../src"

describe("Deconstructed promises", () => {
    it("can be triggered", async () => {
        const {promise, actor} = DeconstructedPromise.forAction(() => 123)
        let result: number | undefined
        let failure: any | undefined
        promise.then(r => result = r, e => failure = e)

        await new Timeout(50)
        assert.equal(result, undefined)
        await actor.resolve()
        await new Timeout(0) // By policy other handlers are kicked out
        assert.equal(result, 123)
        assert.ok(!failure)
    })
    it("can be cancelled", async () => {
        const {promise, actor} = DeconstructedPromise.forAction(() => 123)
        let result: number | undefined
        let failure: any | undefined
        promise.then(r => result = r, e => failure = e)

        await new Timeout(50)
        assert.equal(failure, undefined)
        actor.reject()
        await new Timeout(0) // By policy other handlers are kicked out
        assert.ok(!!failure)
        assert.equal(result, undefined)
    })
})