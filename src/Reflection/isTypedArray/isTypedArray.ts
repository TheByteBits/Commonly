import TypedArray from "Type/TypedArray/TypedArray"



const isTypedArray = <T>(value: T | TypedArray): value is TypedArray =>
    value instanceof Int8Array          ||
    value instanceof Uint8Array         ||
    value instanceof Uint8ClampedArray  ||
    value instanceof Int16Array         ||
    value instanceof Uint16Array        ||
    value instanceof Int32Array         ||
    value instanceof Uint32Array        ||
    value instanceof Float32Array       ||
    value instanceof Float64Array



export default isTypedArray
