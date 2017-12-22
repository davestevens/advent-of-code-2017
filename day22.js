// day22.js
// http://adventofcode.com/2017/day/22

const NODE_CLEAN = ".";
const NODE_WEAKENED = "W";
const NODE_INFECTED = "#";
const NODE_FLAGGED = "F";

const DIRECTION_UP = { x: 0, y: 1 };
const DIRECTION_DOWN = { x: 0, y: -1 };
const DIRECTION_LEFT = { x: -1, y: 0 };
const DIRECTION_RIGHT = { x: 1, y: 0 };
const DIRECTIONS = [ DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT ];

class Grid {
    constructor(initial) {
        this.data = {};
        this.parse(initial);
    }

    set (x, y, value) { this.data[`${ x }:${ y }`] = value; }
    get(x, y) { return this.data[`${ x }:${ y }`] || NODE_CLEAN; }

    parse(input) {
        const rows = input.split("\n").map(row => row.split("").map(cell => cell));
        const rowOffset = Math.floor(rows.length / 2);
        const colOffset = Math.floor(rows[0].length / 2);
        rows.forEach((row, y) => {
            row.forEach((cell, x) => {
                this.set(x - rowOffset, colOffset - y, cell);
            });
        });
    }
}

class Virus {
    constructor(input, turnLookup, updateLookup) {
        this.grid = new Grid(input);
        this.turnLookup = turnLookup;
        this.updateLookup = updateLookup;
        this.x = 0;
        this.y = 0;
        this.direction = DIRECTION_UP;
        this.infections = 0;
    }

    run(count) {
        while (count--) {
            this.turn();
            this.update();
            this.move();
        }
    }

    get current() { return this.grid.get(this.x, this.y); }
    set current(value) { this.grid.set(this.x, this.y, value); }

    turn() {
        const directionIndex = DIRECTIONS.indexOf(this.direction) + this.turnLookup[this.current];
        this.direction = DIRECTIONS[(DIRECTIONS.length + directionIndex) % DIRECTIONS.length];
    }

    update() {
        this.current = this.updateLookup[this.current];
        if (this.current === NODE_INFECTED) {
            this.infections++;
        }
    }

    move() {
        this.x += this.direction.x;
        this.y += this.direction.y;
    }
}

export const virusPart1 = (input) => {
    const turnLookup ={
        [NODE_CLEAN]: -1,
        [NODE_INFECTED]: 1
    };
    const updateLookup = {
        [NODE_CLEAN]: NODE_INFECTED,
        [NODE_INFECTED]: NODE_CLEAN
    };
    const virus = new Virus(input, turnLookup, updateLookup);
    virus.run(10000);
    return virus.infections;
}

export const virusPart2 = (input) => {
    const turnLookup ={
        [NODE_CLEAN]: -1,
        [NODE_WEAKENED]: 0,
        [NODE_INFECTED]: 1,
        [NODE_FLAGGED]: 2
    };
    const updateLookup = {
        [NODE_CLEAN]: NODE_WEAKENED,
        [NODE_WEAKENED]: NODE_INFECTED,
        [NODE_INFECTED]: NODE_FLAGGED,
        [NODE_FLAGGED]: NODE_CLEAN
    };
    const virus = new Virus(input, turnLookup, updateLookup);
    virus.run(10000000);
    return virus.infections;
}
