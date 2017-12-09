import { streamProcessing } from "../day9";

const examplesPart1 = {
    garbage: [
        { input: "<>", output: 0 },
        { input: "<random characters>", output: 0 },
        { input: "<<<<>", output: 0 },
        { input: "<{!>}>", output: 0 },
        { input: "<!!>", output: 0 },
        { input: "<!!!>>", output: 0 },
        { input: '<{o"i!a,<{i<a>', output: 0 }
    ],
    groups: [
        { input: "{}", output: 1 },
        { input: "{{{}}}", output: 3 },
        { input: "{{},{}}", output: 3 },
        { input: "{{{},{},{{}}}}", output: 6 },
        { input: "{<{},{},{{}}>}", output: 1 },
        { input: "{<a>,<a>,<a>,<a>}", output: 1 },
        { input: "{{<a>},{<a>},{<a>},{<a>}}", output: 5 },
        { input: "{{<!>},{<!>},{<!>},{<a>}}", output: 2 }
    ],
    scores: [
        { input: "{}", output: 1 },
        { input: "{{{}}}", output: 6 },
        { input: "{{},{}}", output: 5 },
        { input: "{{{},{},{{}}}}", output: 16 },
        { input: "{<a>,<a>,<a>,<a>}", output: 1 },
        { input: "{{<ab>},{<ab>},{<ab>},{<ab>}}", output: 9 },
        { input: "{{<!!>},{<!!>},{<!!>},{<!!>}}", output: 9 },
        { input: "{{<a!>},{<a!>},{<a!>},{<ab>}}", output: 3 }
    ]
};

const examplesPart2 = [
    { input: "<>", output: 0 },
    { input: "<random characters>", output: 17 },
    { input: "<<<<>", output: 3 },
    { input: "<{!>}>", output: 2 },
    { input: "<!!>", output: 0 },
    { input: "<!!!>>", output: 0 },
    { input: '<{o"i!a,<{i<a>', output: 10 }
];

describe("Day 9: Stream Processing", () => {
    describe("Part 1", () => {
        describe("Ignoring Garbage", () => {
            examplesPart1.garbage.forEach(example => {
                it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                    expect(streamProcessing(example.input).groups).to.have.length(example.output);
                });
            });
        });

        describe("Group counts", () => {
            examplesPart1.groups.forEach(example => {
                it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                    expect(streamProcessing(example.input).groups).to.have.length(example.output);
                });
            });
        });

        describe("Calculating scores", () => {
            examplesPart1.scores.forEach(example => {
                it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                    expect(streamProcessing(example.input).score).to.equal(example.output);
                });
            });
        });
    });

    describe("Part 2", () => {
        examplesPart2.forEach(example => {
            it(`returns ${ example.output } with the input '${ example.input }'`, () => {
                expect(streamProcessing(example.input).garbageCount).to.equal(example.output);
            });
        });
    });
});
