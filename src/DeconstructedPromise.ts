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
     *
     * @returns
     */
    reject(): void {
        const {reject} = this.options
        reject()
    }

    /**
     *
     */
    async resolve(): Promise<void> {
        const {action, resolve} = this.options
        const result = await action()
        resolve(result)
    }
}