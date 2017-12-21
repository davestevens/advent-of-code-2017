import { fractalArt } from "../day21";

const examplesPart1 = [
    {
        input: `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`,
        output: 12
    }
];

describe("Day 21: Fractal Art", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(fractalArt(example.input, 2)).to.equal(example.output);
            });
        });
    });
});
