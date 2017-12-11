// day11.js
// http://adventofcode.com/2017/day/11

const isEven = (value) => !(value % 2)

const updatePosition = (position, movement) => {
    switch (movement) {
        case "n":
        return { x: position.x, y: position.y + 1 };
        case "ne":
        return { 
            x: position.x + 1,
            y: isEven(position.x) ? position.y : position.y + 1
        };
        case "se":
        return {
            x: position.x + 1,
            y: isEven(position.x) ? position.y - 1 : position.y
        };
        case "s":
        return { x: position.x, y: position.y - 1 };
        case "sw":
        return {
            x: position.x - 1,
            y: isEven(position.x) ? position.y - 1 : position.y
        };
        case "nw":
        return {
            x: position.x - 1,
            y: isEven(position.x) ? position.y : position.y + 1
        };
        default:
        return { x: position.x, y: position.y };
    }
}

const distance = (position) => {
    let steps = 0;
    while (!((position.x === 0) && (position.y === 0))) {
        let movement = "";
        if (position.y >= 0) {
            movement += "s";
        } else if (position.y < 0) {
            movement += "n";
        }

        if (position.x > 0) {
            movement += "w";
        } else if (position.x < 0) {
            movement += "e";
        }
        position = updatePosition(position, movement);
        ++steps;
    };
    return steps;
}

export const hexEdPart1 = (input) => {
    let position = { x: 0, y: 0 };
    input.split(",").forEach(movement => {
        position = updatePosition(position, movement);
    });
    return distance(position);
}

export const hexEdPart2 = (input) => {
    let position = { x: 0, y: 0 };
    let furthestDistance = 0;
    input.split(",").forEach(movement => {
        position = updatePosition(position, movement);
        const d = distance(position);
        furthestDistance = d > furthestDistance ? d : furthestDistance;
    });
    return furthestDistance;
}