import { tubesPart1, tubesPart2 } from "../day19";

const examplesPart1 = [
    {
        input: `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `,
        output: "ABCDEF"
    }
];

const examplesPart2 = [
    {
        input: `     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ `,
        output: 38
    }
];

describe("Day 19: A Series of Tubes", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(tubesPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(tubesPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
