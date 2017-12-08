import { registerProgramPart1, registerProgramPart2 } from "../day8";

const examplesPart1 = [
    { input: [
        "b inc 5 if a > 1",
        "a inc 1 if b < 5",
        "c dec -10 if a >= 1",
        "c inc -20 if c == 10"
    ], output: 1 }
];

const examplesPart2 = [
    { input: [
        "b inc 5 if a > 1",
        "a inc 1 if b < 5",
        "c dec -10 if a >= 1",
        "c inc -20 if c == 10"
    ], output: 10 }
];

describe("Day 8: I Heard You Like Registers", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(registerProgramPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(registerProgramPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
