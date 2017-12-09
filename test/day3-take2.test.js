import { spiralMemoryPart1, spiralMemoryPart2 } from "../day3-take2";

const examplesPart1 = [
    { input: 1, output: 0 },
    { input: 12, output: 3 },
    { input: 14, output: 3 },
    { input: 23, output: 2 },
    { input: 19, output: 2 },
    { input: 1024, output: 31 },
    { input: 121, output: 10 }
];

const examplesPart2 = [
    { input: 1, output: 1 },
    { input: 3, output: 4 },
    { input: 50, output: 54 }
];

describe("Day 3 (Take 2): Spiral Memory", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(spiralMemoryPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(spiralMemoryPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
