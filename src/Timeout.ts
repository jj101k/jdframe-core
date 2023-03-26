import { WrappedPromise } from "./WrappedPromise"

/**
 *
 */
export class Timeout extends WrappedPromise<void> {
    /**
     *
     * @param milliseconds
     */
    constructor(milliseconds: number) {
        super(resolve => setTimeout(() => {
            this.debugLog("Pause finished")
            resolve()
        }, milliseconds))
        this.debugLog(`Pause: ${milliseconds}ms`)
    }
}