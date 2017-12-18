import { duetPart1, duetPart2 } from "../day18";

const examplesPart1 = [
    {
        input: `set a 1
        add a 2
        mul a a
        mod a 5
        snd a
        set a 0
        rcv a
        jgz a -1
        set a 1
        jgz a -2`,
        output: 4
    }
];

const examplesPart2 = [
    {
        input: `snd 1
        snd 2
        snd p
        rcv a
        rcv b
        rcv c
        rcv d`,
        output: 3
    }
];

describe("Day 18: Duet", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(duetPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(duetPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
