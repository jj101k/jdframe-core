import { Cancelled } from "./Errors"
import { ExtensiblePromise } from "./ExtensiblePromise"

/**
 * This is a lightweight wrapper around a promise to give you something which
 * won't run immediately but will on request.
 *
 * This is built for cases where one object triggers the promise and another
 * object consumes it. If you're thinking "how do I make it so that the same
 * object consumes it", the short answer is "don't" - you can just use the data
 * instead of triggering a separate object.
 *
 * In the extreme case where the triggering object consumes the promise but
 * _also_ emits the same promise to another object for consumption, you should
 * have a look at DeconstructedPromise, which gives you those as two separate
 * properties.
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