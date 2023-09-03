/**
 * This wraps a set but adds an iterator with gaps, so that you can see where
 * items were deleted.
 */
export class SparseSet<I> extends Set<I> {
    /**
     *
     */
    private currentOffset = 0

    /**
     *
     */
    private itemOffset = new Map<I, number>()

    add(value: I): this {
        if(!this.has(value)) {
            this.itemOffset.set(value, this.currentOffset)
            this.currentOffset++
        }
        return super.add(value)
    }

    clear(): void {
        this.currentOffset = 0
        this.itemOffset = new Map()
        super.clear()
    }

    delete(value: I): boolean {
        this.itemOffset.delete(value)
        return super.delete(value)
    }

    *sparseValues(): IterableIterator<I | undefined> {
        const offsets = [...this.itemOffset.values()]
        let lastOffset = -1
        for(const v of this.values()) {
            const offset = offsets.shift()!
            for(let i = lastOffset; i < offset - 1; i++) {
                yield undefined
            }
            yield v
            lastOffset = offset
        }
        for(let i = lastOffset; i < this.currentOffset - 1; i++) {
            yield undefined
        }
    }
}