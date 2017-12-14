import { diskDefragmentationPart1, diskDefragmentationPart2 } from "../day14";

const examplesPart1 = [
    { input: "flqrgnkx", output: 8108 }
];

const examplesPart2 = [
    { input: "flqrgnkx", output: 1242 }
];

describe("Day 14: Disk Defragmentation", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(diskDefragmentationPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(diskDefragmentationPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
