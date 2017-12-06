import { mazeFinderPart1, mazeFinderPart2 } from "../day5";

const examplesPart1 = [
    { input: [0, 3, 0, 1, -3], output: 5 }
];

const examplesPart2 = [
    { input: [0, 3, 0, 1, -3], output: 10 }
];

describe("Day 5: A Maze of Twisty Trampolines, All Alike", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(mazeFinderPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(mazeFinderPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
