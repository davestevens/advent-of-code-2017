// day19.js
// http://adventofcode.com/2017/day/19

const DIRECTION_DOWN = "DOWN";
const DIRECTION_UP = "UP";
const DIRECTION_LEFT = "LEFT";
const DIRECTION_RIGHT = "RIGHT";

const CELL_VERTICAL = "|";
const CELL_HORIZONTAL = "-";
const CELL_CROSS = "+";
const CELL_EMPTY = " ";

const STATE_RUNNING = "RUNNING";
const STATE_ENDED = "ENDED";

class Tubes {
    constructor(input) {
        this.width = 0;
        this.height = 0;
        this.grid = this.parseGrid(input);
        this.position = { x: -1, y: -1 };
        this.direction = null;
        this.state = STATE_RUNNING;
        this.string = "";
        this.steps = 0;

        this.calculateFirstMove();
    }

    parseGrid(input) {
        const grid = input.split("\n").map(row => row.split(""));
        this.width = Math.max(...grid.map(row => row.length));
        this.height = grid.length;
        return grid;
    }

    run() {
        while (this.state === STATE_RUNNING) {
            ++this.steps;
            this.move();
            this.checkPosition();
        }
    }

    move() {
        const nextPosition = this.calculateNextPosition(this.direction, this.position);
        if (nextPosition) {
            this.position = nextPosition;
        } else {
            throw new Error("Out Of Bounds!");
        }
    }

    calculateNextPosition(direction, position) {
        const checkBounds = ({ x, y }) => {
            if ((x < 0 || x >= this.width) || (y < 0 || y >= this.height)) {
                return null;
            }
            return { x, y };
        }

        switch(direction) {
            case DIRECTION_DOWN:
            return checkBounds({ x: position.x, y: position.y + 1 });
            case DIRECTION_UP:
            return checkBounds({ x: position.x, y: position.y - 1 });
            case DIRECTION_LEFT:
            return checkBounds({ x: position.x - 1, y: position.y });
            case DIRECTION_RIGHT:
            return checkBounds({ x: position.x + 1, y: position.y });
        }
    }

    cell(position) {
        return this.grid[position.y][position.x];
    }

    checkPosition() {
        const current = this.cell(this.position);
        switch (current) {
            case CELL_VERTICAL:
            case CELL_HORIZONTAL:
            break;
            case CELL_CROSS:
            this.calculateNewDirection();
            break;
            case CELL_EMPTY:
            this.state = STATE_ENDED;
            break;
            default:
            this.string += current;
            break;
        }
    }

    calculateNewDirection() {
        const current = this.direction;
        const directions = [
            { value: DIRECTION_UP, ignore: DIRECTION_DOWN },
            { value: DIRECTION_DOWN, ignore: DIRECTION_UP },
            { value: DIRECTION_LEFT, ignore: DIRECTION_RIGHT },
            { value: DIRECTION_RIGHT, ignore: DIRECTION_LEFT }
        ];

        for (let i = 0; i < directions.length; ++i) {
            const direction = directions[i];
            if (direction.ignore === current) {
                continue;
            }

            const next = this.calculateNextPosition(direction.value, this.position);
            if (next) {
                const cell = this.cell(next);
                if (cell !== CELL_EMPTY) {
                    this.direction = direction.value;
                    break;
                }
            }
        }
    }

    calculateFirstMove() {
        let x = -1;
        while (++x < this.width) {
            if (this.grid[0][x] === CELL_VERTICAL) {
                break;
            }
        }
        this.position = { y: 0, x };
        this.direction = DIRECTION_DOWN;
    }
}

export const tubesPart1 = (input) => {
    const tubes = new Tubes(input);
    tubes.run();
    return tubes.string;
}

export const tubesPart2 = (input) => {
    const tubes = new Tubes(input);
    tubes.run();
    return tubes.steps;
}