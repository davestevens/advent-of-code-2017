import { memoryReallocationPart1, memoryReallocationPart2 } from "../day6";

const examplesPart1 = [
    { input: [0, 2, 7, 0], output: 5 }
];

const examplesPart2 = [
    { input: [0, 2, 7, 0], output: 4 }
];

describe("Day 6: Memory Reallocation", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(memoryReallocationPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(memoryReallocationPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
