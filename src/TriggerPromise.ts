import { Cancelled } from "./Errors"
import { ExtensiblePromise } from "./ExtensiblePromise"

/**
 * This is a lightweight wrapper around a promise to give you something which
 * won't run immediately but will on request.
 */
export class TriggerPromise extends ExtensiblePromise<unknown> {
    /**
     *
     */
    protected promise = new Promise((resolve, reject) => {
        this.reject = reject
        this.resolve = resolve
    })

    /**
     *
     */
    private reject!: (error?: any) => void

    /**
     *
     */
    private resolve!: (value: any) => void

    /**
     * Returns the promise, so that you can avoid exposing the trigger if
     * needed.
     */
    get promiseOnly() {
        return this.promise
    }

    /**
     * Do the work.
     */
    activate() {
        this.resolve(null)
    }

    /**
     * Give up on the work.
     */
    cancel() {
        this.reject(new Cancelled())
    }
}