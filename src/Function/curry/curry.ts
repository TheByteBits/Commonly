import size from "List/size/size"



const curry = (f, thisArg = this) => {
	if (size(f) < MINIMUM_ARITY) {
		return f
	}

	return curried.bind(thisArg, f)
}


const MINIMUM_ARITY = 2

const curried = function (f, ...varargs) {
	if (size(varargs) >= size(f)) {
		return f(...varargs)
	} else {
		return curried.bind(this, f, ...varargs)
	}
}



export default curry