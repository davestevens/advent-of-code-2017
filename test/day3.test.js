import { getCoords, spiralMemoryPart1 } from "../day3";

const examplesPart1 = [
    { input: 1, output: 0, coords: [0,-0] },
    { input: 12, output: 3, coords: [2,1] },
    { input: 14, output: 3, coords: [1,2] },
    { input: 23, output: 2, coords: [0,-2] },
    { input: 19, output: 2, coords: [-2,0] },
    { input: 1024, output: 31, coords: [-15,16] },
    { input: 121, output: 10, coords: [5,-5] }
];

describe("Day 3: Spiral Memory", () => {
    describe("getCoords", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.coords } with the input '${ example.input }'`, () => {
                expect(getCoords(example.input)).to.deep.equal(example.coords);
            });
        });
    });

    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(spiralMemoryPart1(example.input)).to.equal(example.output);
            });
        });
    });
});
