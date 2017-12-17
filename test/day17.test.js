import { spinlockPart1 } from "../day17";

const examplesPart1 = [
    { input: 3, output: 638 }
];

describe("Day 17: Spinlock", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(spinlockPart1(example.input)).to.equal(example.output);
            });
        });
    });
});
