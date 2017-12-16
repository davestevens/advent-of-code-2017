// day16.js
// http://adventofcode.com/2017/day/16

const buildProgramList = (size) => {
    return Array.apply(null, Array(size)).map((_value, i) => String.fromCharCode(i + 97));
}

const INSTRUCTION_MATCHER = /(\w)(\w*)(\/(\w+))?/;

const switchInstruction = (programs, count) => {
    return programs.slice(programs.length - count, programs.length).concat(programs.slice(0, -count));
}

const switchByIndex = (programs, a, b) => {
    const programA = programs[a];
    programs[a] = programs[b];
    programs[b] = programA;
    return programs;
}

const buildDance = (instruction) => {
    const match = instruction.match(INSTRUCTION_MATCHER);
    switch (match[1]) {
        case "s":
        return (programs) => switchInstruction(programs, +match[2]);
        break;
        case "x":
        return (programs) => switchByIndex(programs, +match[2], +match[4]);
        break;
        case "p":
        return (programs) => switchByIndex(programs, programs.indexOf(match[2]), programs.indexOf(match[4]));
        break;
    }
}

export const permutationPromenadePart1 = (input, size = 16) => {
    const programs = buildProgramList(size);
    return input.split(",")
                .map(buildDance)
                .reduce((p, e) => e(p), programs)
                .join("");
}

export const permutationPromenadePart2 = (input, size = 16) => {
    let programs = buildProgramList(size);
    const dance = input.split(",").map(buildDance);

    const seen = new Set();
    while (!seen.has(programs.join(""))) {
        seen.add(programs.join(""));
        programs = dance.reduce((memo, danceMove) => danceMove(memo), programs);
    }

    for (let i = 0; i < (1000000000 % seen.size); ++i) {
        programs = dance.reduce((memo, danceMove) => danceMove(memo), programs);
    }
    return programs.join("");
}