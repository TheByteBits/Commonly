import TrieNode from "./TrieNode"
import isUndefined from "Type/isUndefined/isUndefined"
import Reducible from "Protocol/Reducible"
import Accumulable from "Protocol/Accumulable"

export default class Trie<T> implements Iterable<{value: T, key: string}>,
                                        Accumulable<{value: T, key: string}>,
                                        Reducible<Trie<T>, {value: T, key: string}> {

    root = new TrieNode<T>(undefined, '')

    add(value: T, key: string): boolean {
        return this.root.add(value, key)
    }

    remove(key: string): boolean {
        return this.root.remove(key)
    }

    find(key: string): T {
        const found = this.root.find(key)
        return isUndefined(found) ? undefined : found.value
    }

    size(): number {
        return this.root.size()
    }

    isEmpty(): boolean {
        return this.root.children.length === 0
    }

    toArray(): {key: string, value: T}[] {
        return this.root.toArray([]).map(e => { return { key: e.key(), value: e.value } })
    }

    values(): T[] {
        return this.root.toArray([]).map(e => e.value)
    }

    keys(): string[] {
        return this.root.toArray([]).map(e => e.key())
    }

    [Symbol.iterator](): Iterator<{value: T, key: string}> {
        return this.toArray()[Symbol.iterator]()
    }

    [Accumulable.accumulator](): Iterable<{value: T, key: string}> {
        return new Trie<T>()
    }

    [Reducible.reducer](akumulator: Trie<T>, value: {value: T, key: string}): Trie<T> {
        akumulator.add(value.value, value.key)
        return akumulator
    }
}