import { packetScannersPart1, packetScannersPart2 } from "../day13";

const examplesPart1 = [
    {
        input: `0: 3
                1: 2
                4: 4
                6: 4`,
        output: 24
    }
];

const examplesPart2 = [
    {
        input: `0: 3
                1: 2
                4: 4
                6: 4`,
        output: 10
    }
];

describe("Day 13: Packet Scanners", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(packetScannersPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(packetScannersPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
