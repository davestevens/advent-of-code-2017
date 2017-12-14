// day14.js
// http://adventofcode.com/2017/day/14

import { KnotHash } from "./day10";

const hexToBin = (hex) => {
    return ("0000" + parseInt(hex, 16).toString(2)).substr(-4);
}

const runKnotHash = (input) => {
    const knotHash = new KnotHash();
    knotHash.run(input);
    const hash = knotHash.hash;
    return hash.split("").map(hexToBin).join("").split("");
}

const hashInput = (input) => {
    return Array.apply(null, Array(128)).map((_value, i) => runKnotHash(`${ input }-${ i }`));
}

const countUsed = (input) => {
    return input.reduce((memo, row) => {
        return memo + row.reduce((rowMemo, square) => rowMemo + +square, 0);
    }, 0);
}

const squareRegion = (input, x, y) => {
    if (!input[y] || !input[y][x]) {
        return { x, y, region: null };
    } else if (input[y][x] === "0" || input[y][x] === "1") {
        return { x, y, region: null };
    } else {
        return { x, y, region: input[y][x] };
    }
}

const updateRegion = (input, previousRegion, newRegion) => {
    for (let y = 0; y < input.length; ++y) {
        for (let x = 0; x < input[y].length; ++x) {
            if (input[y][x] === previousRegion) {
                input[y][x] = newRegion;
            }
        }
    }
}

const countRegions = (input) => {
    let region = 0;
    let cancelledRegions = [];
    for (let y = 0; y < input.length; ++y) {
        for (let x = 0; x < input[y].length; ++x) {
            const value = input[y][x];
            if (value === "0") { continue; }

            const surroundings = [
                squareRegion(input, x, y - 1),
                squareRegion(input, x + 1, y),
                squareRegion(input, x - 1, y),
                squareRegion(input, x, y + 1)
            ].filter(square => square.region);

            if (surroundings.length) {
                const sharedRegion = Math.min(...surroundings.map(square => square.region));
                input[y][x] = sharedRegion;
                surroundings.filter(square => square.region !== sharedRegion)
                            .forEach(square => {
                                cancelledRegions.push(square.region);
                                updateRegion(input, square.region, sharedRegion);
                            });
            } else {
                input[y][x] = ++region;
            }
        }
    }
    return region - cancelledRegions.length;
}

export const diskDefragmentationPart1 = (input) => {
    const rows = hashInput(input);
    return countUsed(rows);
}

export const diskDefragmentationPart2 = (input) => {
    const rows = hashInput(input);
    return countRegions(rows);
}