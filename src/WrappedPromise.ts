import { ExtensiblePromise } from "./ExtensiblePromise"

/**
 *
 */
export class WrappedPromise<T> extends ExtensiblePromise<T> {
    protected promise: Promise<T>
    /**
     *
     * @param executor
     */
    constructor(executor: (resolve: (v: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void) => any
    ) {
        super()
        this.promise = new Promise(executor)
    }
}