import Accumulable from "Protocol/Accumulable"
import Reducible from "Protocol/Reducible"
import isNull from "Reflection/isNull/isNull"
import BinaryTreeNode from "./BinaryTreeNode"

export default class BinaryTree<T> implements Iterable<T>, Accumulable<T>, Reducible<BinaryTree<T>, T> {

    comparator: (a: T, b: T) => boolean
    root: BinaryTreeNode<T> = null

    constructor(comparator: (a: T, b: T) => boolean = (a, b) => a > b) {
        this.comparator = comparator
    }

    add(value: T) {
        if (isNull(this.root)) {
            this.root = new BinaryTreeNode(value, this.comparator)
        } else {
            this.root.add(value)
        }
    }

    remove(value: T) {
        if (!isNull(this.root)) {
            if (this.root.isValueEqual(value)) {
                const leftDepth = !isNull(this.root.left) ? this.root.left.depth() : 0
                const rightDepth = !isNull(this.root.right) ? this.root.right.depth() : 0

                if (!leftDepth || !rightDepth) {
                    this.root = leftDepth >= rightDepth ? this.root.left : this.root.right
                } else {
                    const min = this.root.right.min()
                    this.root.value = min.value
                    min.parent.remove(min.value)
                }
            } else {
                this.root.remove(value)
            }
        }
    }

    min(): T {
        return isNull(this.root) ? null : this.root.min().value
    }

    max(): T {
        return isNull(this.root) ? null : this.root.max().value
    }

    isEmpty(): boolean {
        return isNull(this.root)
    }

    size(): number {
        return isNull(this.root) ? 0 : this.root.size()
    }

    depth(): number {
        return isNull(this.root) ? 0 : this.root.depth()
    }

    toArray(): T[] {
        return isNull(this.root) ? [] : this.root.toArray([])
    }

    [Symbol.iterator](): Iterator<T> {
        if (isNull(this.root)) {
            return { next() { return { done: true, value: undefined } } }
        } else {
            return this.root.toArray([])[Symbol.iterator]()
        }
    }

    [Accumulable.accumulator](): Iterable<T> {
        return new BinaryTree<T>()
    }

    [Reducible.reducer](accumulator: BinaryTree<T>, value: T): BinaryTree<T> {
        accumulator.add(value)
        return accumulator
    }
}
