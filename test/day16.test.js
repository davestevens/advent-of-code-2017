import { permutationPromenadePart1 } from "../day16";

const examplesPart1 = [
    {
        input: "s1,x3/4,pe/b", output: "baedc"
    }
];

describe("Day 16: Permutation Promenade", function() {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(permutationPromenadePart1(example.input, 5)).to.equal(example.output);
            });
        });
    });
});
