// day3.js
// http://adventofcode.com/2017/day/3

const percent = (fromSquare, toSquare, input) => {
    const diff = ((toSquare - fromSquare) - 1);
    return (toSquare - input) / diff;
}

const oddToEven = (from, to, input) => {
    const fromSquare = from ** 2;
    const toSquare = to ** 2;
    if (percent(fromSquare, toSquare, input) > 0.5) { // right level
        return [Math.floor(from / 2) + 1, -Math.floor(from / 2) + ((input - fromSquare) - 1)];
    } else { // top level
        return [-(to / 2) + (toSquare - input) + 1, to / 2];
    }
    return [NaN, NaN];
}

const evenToOdd = (from, to, input) => {
    const fromSquare = from ** 2;
    const toSquare = to ** 2;
    if (percent(fromSquare, toSquare, input) > 0.5) { // left level
        return [-(from / 2), from / 2 - ((input - fromSquare) - 1)]
    } else { // bottom level
        return [Math.floor(to / 2) - (toSquare - input), -Math.floor(to / 2)];
    }
    return [NaN, NaN];
}

const getDistance = (coords) => {
    return (Math.abs(coords[0]) + Math.abs(coords[1]));
}

const closestSquare = (input) => {
    return Math.ceil(Math.sqrt(input));
}

export const getCoords = (input) => {
    const to = closestSquare(input);
    const from = to - 1;
    if (from % 2) {
        return oddToEven(from, to, input);
    } else {
        return evenToOdd(from, to, input);
    }
}

export const spiralMemoryPart1 = (input) => {
    const coords = getCoords(input);
    return getDistance(coords);
}