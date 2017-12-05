import { inverseCaptchaPart1, inverseCaptchaPart2 } from "../day1";

const examplesPart1 = [
    { input: "1122", output: 3 },
    { input: "1111", output: 4 },
    { input: "1234", output: 0 },
    { input: "91212129", output: 9 }
];

const examplesPart2 = [
    { input: "1212", output: 6 },
    { input: "1221", output: 0 },
    { input: "123425", output: 4 },
    { input: "123123", output: 12 },
    { input: "12131416", output: 4 }
];

describe("Day 1: Inverse Captcha", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(inverseCaptchaPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(inverseCaptchaPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
