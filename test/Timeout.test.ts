import assert from "assert"
import { Timeout } from "../src"

describe("Timeout tests", () => {
    it("resolves after the given time (roughly)", async () => {
        const start = new Date().valueOf()
        await new Timeout(50)
        const finish = new Date().valueOf()
        assert.ok(finish > start + 40)
        assert.ok(finish < start + 60)
    })
})