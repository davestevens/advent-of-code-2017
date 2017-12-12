import { digitalPlumberPart1, digitalPlumberPart2 } from "../day12";

const examplesPart1 = [
    {
        input: `0 <-> 2
                1 <-> 1
                2 <-> 0, 3, 4
                3 <-> 2, 4
                4 <-> 2, 3, 6
                5 <-> 6
                6 <-> 4, 5`,
        output: 6
    }
];

const examplesPart2 = [
    {
        input: `0 <-> 2
                1 <-> 1
                2 <-> 0, 3, 4
                3 <-> 2, 4
                4 <-> 2, 3, 6
                5 <-> 6
                6 <-> 4, 5`,
        output: 2
    }
];

describe("Day 12: Digital Plumber", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(digitalPlumberPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(digitalPlumberPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
