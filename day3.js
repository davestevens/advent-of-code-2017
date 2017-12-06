// day3.js
// http://adventofcode.com/2017/day/3

const getDistance = (coords) => (Math.abs(coords[0]) + Math.abs(coords[1]));

const oddSquareCoords = (value) => {
    const coord = Math.floor(Math.sqrt(value) / 2);
    return [coord, -coord];
}

const evenSquareCoords = (value) => {
    const coord = Math.floor(Math.sqrt(value) / 2);
    return [-(coord - 1), coord];
}

const clockwise = (from, to) => {
    const isEven = !(from % 2);
    const coords = isEven ? evenSquareCoords(from) : oddSquareCoords(from);

    return [
        coords[0] + (isEven ? (from - to) : -(from - to)),
        coords[1]
    ];
}

const antiClockwise = (from, to) => {
    const isEven = !(from % 2);
    const coords = isEven ? evenSquareCoords(from) : oddSquareCoords(from);

    return [
        coords[0] + (isEven ? -1 : 1),
        coords[1] + (isEven ? -((to - from) - 1) : ((to - from) - 1))
    ];
}

const closestSquare = (input) => Math.round(Math.sqrt(input)) ** 2;

export const getCoords = (input) => {
    const closest = closestSquare(input);
    if (closest < input) {
        return antiClockwise(closest, input);
    } else if (closest > input) {
        return clockwise(closest, input);
    } else {
        if (input % 2) {
            return oddSquareCoords(input);
        } else {
            return evenSquareCoords(input);
        }
    }
}

export const spiralMemoryPart1 = (input) => {
    const coords = getCoords(input);
    return getDistance(coords);
}