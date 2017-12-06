// day5.js
// http://adventofcode.com/2017/day/5

class MazeFinder {
    constructor(program, execute) {
        this.program = program;
        this.programLength = program.length;
        this.programCounter = 0;
        this.execute = execute.bind(this);
    }

    run() {
        let clock = 0;
        while (!this.hasFinished()) {
            this.execute();
            ++clock;
        }
        return clock;
    }

    hasFinished() {
        return (this.programCounter < 0) || (this.programCounter > (this.programLength - 1));
    }
}

export const mazeFinderPart1 = (input) => {
    return new MazeFinder(
        input,
        function() { this.programCounter += this.program[this.programCounter]++; }
    ).run();
}

export const mazeFinderPart2 = (input) => {
    return new MazeFinder(
        input,
        function() {
            const toMove = this.program[this.programCounter];
            if (toMove >= 3) {
                this.program[this.programCounter]--;
            } else {
                this.program[this.programCounter]++;
            }
            this.programCounter += toMove;
        }
    ).run();
}