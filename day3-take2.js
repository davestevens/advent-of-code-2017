// day3-take2.js
// http://adventofcode.com/2017/day/3

class Spiral {
    constructor(increaseValueFn) {
        this.cells = [];
        this.increaseValueFn = increaseValueFn.bind(this);
    }

    fill(max = 100) {
        let value = 0;
        let x = -1;
        let y = 0;
        while (value < max) {
            if (x > 0) {
                const above = this.getCellByCoords(x, y + 1);
                if (above) {
                    x = x + 1;
                } else {
                    const left = this.getCellByCoords(x - 1, y);
                    if (left) {
                        y = y + 1;
                    } else {
                        x = x - 1;
                    }
                }
            } else if (x <= 0) {
                const below = this.getCellByCoords(x, y - 1);
                if (below) {
                    x = x - 1;
                } else {
                    const right = this.getCellByCoords(x + 1, y);
                    if (right) {
                        y = y - 1;
                    } else {
                        x = x + 1;
                    }
                }
            }

            value = this.increaseValueFn(value, x, y);
            this.cells.push({ x, y, value });
        }

        return value;
    }

    getCellByCoords(x, y) {
        return this.cells.filter(cell => {
            return cell.x === x && cell.y === y;
        })[0];
    }

    getCellByValue(value) {
        return this.cells.filter(cell => {
            return cell.value === value
        })[0];
    }

    getDistance(value) {
        const cell = this.getCellByValue(value);
        return (Math.abs(cell.x) + Math.abs(cell.y))
    }
}

export const spiralMemoryPart1 = (input) => {
    const spiral = new Spiral((value) => value + 1);
    spiral.fill(input);
    return spiral.getDistance(input);
}

export const spiralMemoryPart2 = (input) => {
    const spiral = new Spiral(function(_value, x, y) {
        let value = 0;
        for (let i = x - 1; i <= x + 1; ++i) {
            for (let j = y - 1; j <= y + 1; ++j) {
                const cell = this.getCellByCoords(i, j);
                value += cell ? cell.value : 0;
            }
        }
        return value || 1;
    });
    return spiral.fill(input);
}