import { virusPart1, virusPart2 } from "../day22";

const examplesPart1 = [
    {
        input: `..#
#..
...`,
        output: 5587
    }
];

const examplesPart2 = [
    {
        input: `..#
#..
...`,
        output: 2511944
    }
];

describe("Day 22: Sporifica Virus", function() {
    this.timeout(10000);

    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(virusPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(virusPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
