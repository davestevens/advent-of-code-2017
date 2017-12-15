import { duelingGeneratorsPart1, duelingGeneratorsPart2 } from "../day15";

const examplesPart1 = [
    {
        input: { generatorA: 65, generatorB: 8921, iterationCount: 40000000 }, output: 588
    }
];

const examplesPart2 = [
    {
        input: { generatorA: 65, generatorB: 8921, iterationCount: 5000000 }, output: 309
    }
];

describe("Day 15: Dueling Generators", function() {
    this.timeout(10000);

    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ JSON.stringify(example.input) }'`, () => {
                expect(duelingGeneratorsPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ JSON.stringify(example.input) }'`, () => {
                expect(duelingGeneratorsPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
