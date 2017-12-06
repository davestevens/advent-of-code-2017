import { highEntropyPassphrasesPart1, highEntropyPassphrasesPart2 } from "../day4";

const examplesPart1 = [
    { input: "aa bb cc dd ee", output: true },
    { input: "aa bb cc dd aa", output: false },
    { input: "aa bb cc dd aaa", output: true }
];

const examplesPart2 = [
    { input: "abcde fghij", output: true },
    { input: "abcde xyz ecdab", output: false },
    { input: "a ab abc abd abf abj", output: true },
    { input: "iiii oiii ooii oooi oooo", output: true },
    { input: "oiii ioii iioi iiio", output: false }
];

describe("Day 4: High-Entropy Passphrases", () => {
    describe("Part 1", () => {
        examplesPart1.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(highEntropyPassphrasesPart1(example.input)).to.equal(example.output);
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(highEntropyPassphrasesPart2(example.input)).to.equal(example.output);
            });
        });
    });
});
