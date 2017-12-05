import { corruptionChecksumPart1, corruptionChecksumPart2 } from "../day2";

const examplesPart1 = [
    { input: [[5, 1, 9, 5], [7, 5, 3], [2, 4, 6, 8]], output: 18 }
];

const examplesPart2 = [
    { input: [[5, 9, 2, 8], [9, 4, 7, 3], [3, 8, 6, 5]], output: 9 }
];

describe("Day 2: Corruption Checksum", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(corruptionChecksumPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(corruptionChecksumPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
