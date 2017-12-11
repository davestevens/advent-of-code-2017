import { hexEdPart1, hexEdPart2 } from "../day11";

const examplesPart1 = [
    { input: "ne,ne,ne", output: 3 },
    { input: "ne,ne,sw,sw", output: 0 },
    { input: "ne,ne,s,s", output: 2 },
    { input: "se,sw,se,sw,sw", output: 3 }
];

const examplesPart2 = [
    { input: "ne,ne,ne", output: 3 },
    { input: "ne,ne,sw,sw", output: 2 },
    { input: "ne,ne,s,s", output: 2 },
    { input: "se,sw,se,sw,sw", output: 3 }
];

describe("Day 11: Hex Ed", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(hexEdPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(hexEdPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
