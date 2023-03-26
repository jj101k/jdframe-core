import assert from "assert"
import { Timeout, TriggerPromise } from ".."

describe("Trigger promise", () => {
    it("is not resolved until triggered", async () => {
        const tp = new TriggerPromise()
        let start: Date
        let resolved: Date | undefined
        const triggerAndWait = async () => {
            start = new Date()
            await tp
            resolved = new Date()
        }

        const p = triggerAndWait()
        await new Timeout(50) // Sample time
        assert.ok(resolved === undefined)
        tp.activate()
        await new Timeout(0)
        assert.ok(resolved !== undefined)
    })
    it("is not resolved at all if cancelled", async () => {
        const tp = new TriggerPromise()
        let start: Date
        let failed: Date | undefined
        const triggerAndWait = async () => {
            start = new Date()
            try {
                await tp
            } catch(e) {
                failed = new Date()
            }
        }

        const p = triggerAndWait()
        await new Timeout(50) // Sample time
        assert.ok(failed === undefined)
        tp.cancel()
        await new Timeout(0)
        assert.ok(failed !== undefined)
    })
})