/**
 *
 */
type PromisableFunction<T = any> = () => (Promise<T> | T)

/**
 *
 */
export class DeconstructedPromise<T> {
    /**
     * Returns a promise which will subsequently trigger action(), when the
     * actor is resolved.
     *
     * @param action
     * @returns
     */
    static forAction<T>(action: PromisableFunction<T>) {
        let actor!: DeconstructedPromise<T>
        const promise = new Promise((resolve, reject) => { // Called immediately
            actor = new DeconstructedPromise(resolve, reject, action)
        })
        return {promise, actor}
    }

    /**
     *
     */
    private readonly options: {
        action: PromisableFunction<T>,
        reject: () => any,
        resolve: (result: T) => any,
    }

    /**
     *
     * @param resolve
     * @param reject
     * @param action
     */
    constructor(resolve: (result: T) => any, reject: () => any, action: PromisableFunction<T>) {
        this.options = {resolve, reject, action}
    }

    /**
     * Rejects the action. This returns immediately; any consequences of
     * rejection will happen in a later execution pass.
     */
    reject(): void {
        const {reject} = this.options
        setImmediate(reject)
    }

    /**
     * Resolves the action.
     *
     * Notably, the promise this returns will not be resolved until the action
     * is resolved/rejected, but without waiting for the originally passed
     * resolver to be resolved/rejected.
     *
     * @returns
     */
    async resolve(): Promise<void> {
        const {action, resolve} = this.options
        const result = await action()
        setImmediate(() => resolve(result))
    }
}