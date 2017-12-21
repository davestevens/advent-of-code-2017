// day21.js
// http://adventofcode.com/2017/day/21

const START = [
    [".","#","."],
    [".",".","#"],
    ["#","#","#"]
];

const build2DArray = (size)  => Array.apply(null, Array(size)).map((_value, i) => Array.apply(null, Array(size)).map(() => null));

const rotate2DArray = (array, size) => {
    const rotated = build2DArray(size);
    for (let y = 0; y < size; ++y) {
        for (let x = 0; x < size; ++x) {
            rotated[y][x] = array[size - x - 1][y];
        }
    }
    return rotated;
}

const flip2DArrayHorizontal = (array, size) => {
    const flipped = build2DArray(size);
    for (let y = 0; y < size ; ++y) {
        flipped[y] = array[y].reverse();
    }
    return flipped;
}

const flip2DArrayVertical = (array, size) => {
    const flipped = build2DArray(size);
    for (let y = 0; y < size; ++y) {
        for (let x = 0; x < size; ++x) {
            flipped[y][x] = array[size - 1 - y][x];
        }
    }
    return flipped;
}

const createAllMatches = (array) => {
    const all = [array];
    for (let i = 1; i < 4; ++i) {
        all.push(rotate2DArray(all[i - 1], array.length));
    }
    for (let i = 0; i < 4; ++i) {
        all.push(flip2DArrayHorizontal(all[i], array.length));
        all.push(flip2DArrayVertical(all[i], array.length));
    }
    return all;
}

const parse = (string) => {
    const [input, output] = string.split(/\s+=>\s+/);
    const inputArray = input.split("/").map(row => row.split(""));
    return {
        inputLength: inputArray.length,
        inputs: createAllMatches(inputArray),
        output: output.split("/").map(row => row.split(""))
    }
}

const compare2DArrays = (a, b) => (a.length === b.length) && (JSON.stringify(a) === JSON.stringify(b));

const matchedPattern = (pattern, inputs) => !!inputs.find(input => compare2DArrays(pattern, input));

const findMatchingRule = (square, rules) => {
    return rules
        .filter(rule => rule.inputLength === square.length)
        .find(rule => matchedPattern(square, rule.inputs));
}

const splitPattern = (sizeIn, sizeOut, pattern, rules) => {
    const numberOfSquares = pattern.length / sizeIn;
    const newPattern = build2DArray(numberOfSquares * sizeOut);
    const square = build2DArray(sizeIn);
    for (let i = 0; i < numberOfSquares; ++i) {
        for (let j = 0; j < numberOfSquares; ++j) {
            for (let y = 0; y < sizeIn; ++y) {
                for (let x = 0; x < sizeIn; ++x) {
                    square[y][x] = pattern[y + (sizeIn * j)][x + (sizeIn * i)];
                }
            }
            const rule = findMatchingRule(square, rules);
            for (let y = 0; y < sizeOut; ++y) {
                for (let x = 0; x < sizeOut; ++x) {
                    newPattern[y + (sizeOut * j)][x + (sizeOut * i)] = rule.output[y][x];
                }
            }
        }
    }
    return newPattern;
}

const iteration = (pattern, rules) => {
    const size = pattern.length;
    if (!(size % 2)) {
        return splitPattern(2, 3, pattern, rules);
    } else if (!(size % 3)) {
        return splitPattern(3, 4, pattern, rules);
    }
}

const countPixels = (pattern) => {
    return pattern.reduce((memo, row) => {
        return memo + row.reduce((rowMemo, cell) => rowMemo + ((cell === "#") ? 1 : 0), 0);
    }, 0);
}

export const fractalArt = (input, iterationCount = 5) => {
    let pattern = START.slice(0);
    const rules = input.split("\n").map(parse);

    while (iterationCount--) {
        pattern = iteration(pattern, rules);
    }
    return countPixels(pattern);
}
