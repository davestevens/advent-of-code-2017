import { knotHashPart1, knotHashPart2 } from "../day10";

const examplesPart1 = [
    {
        input: {
            size: 5,
            lengths: [3, 4, 1, 5]
        },
        output: 12
    }
];

const examplesPart2 = [
    { input: "", output: "a2582a3a0e66e6e86e3812dcb672a272" },
    { input: "AoC 2017", output: "33efeb34ea91902bb2f59c9920caa6cd" },
    { input: "1,2,3", output: "3efbe78a8d82f29979031a4aa0b16a9d" },
    { input: "1,2,4", output: "63960835bcdc130f0b66d7ff4f6a5a8e" },
];

describe("Day 10: Knot Hash", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input.lengths }'`, () => {
                expect(knotHashPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(knotHashPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
