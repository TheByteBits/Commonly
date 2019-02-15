import xmap from "./xmap"

import compose  from "Function/compose/compose"
import add      from "Math/add/add"
import multiply from "Math/multiply/multiply"



describe(`function xmap(mapper, reducer)`, () => {
    context(`transducer's step function'`, () => {
        it(`should return a valid result with add(2) as a mapper`, () => {
            const subject = xmap(add(2))(add)

            expect(subject(0, 5, 0))
                .toEqual(7)
        })

        it(`should return a valid result with multiply(2) as a mapper`, () => {
            const subject = xmap(multiply(2))(add)

            expect(subject(0, 5, 0))
                .toEqual(10)
        })
    })

    context(`transducer's composition`, () => {
        it(`should return a number 7`, () => {
            const subject =
                compose(
                    xmap(add(1)),
                    xmap(multiply(2)),
                    xmap(add(3))
                )(add)

            expect(subject(0, 1))
                .toEqual(7)
        })

        it(`should return a number 9`, () => {
            const subject =
                compose(
                    xmap(multiply(1)),
                    xmap(add(2)),
                    xmap(multiply(3))
                )(add)

            expect(subject(0, 1))
                .toEqual(9)
        })
    })
})
