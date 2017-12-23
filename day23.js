// day23.js
// http://adventofcode.com/2017/day/23

class Memory {
    constructor() {
        this.registers = {};
    }

    get(argument) {
        if (isNaN(parseInt(argument))) {
            return this.registers[argument] || 0;
        } else {
            return +argument;
        }
    }

    set(register, value) {
        this.registers[register] = value;
    }
}

const INSTRUCTION_MATCHER = /(\w+)\s+(\w+)(\s*(-?\w+))?$/;
const RUNNING = "RUNNING";
const COMPLETED = "COMPLETED";

class Processor {
    constructor(instructions, debug = false) {
        this.instructions = instructions.map(instruction => instruction.match(INSTRUCTION_MATCHER));
        this.memory = new Memory();
        this.memory.set("a", debug ? 0 : 1);
        this.programCounter = 0;
        this.state = RUNNING;
        this.mulCount = 0;
    }

    cycle() {
        if (this.programCounter > (this.instructions.length - 1)) {
            this.state = COMPLETED;
            return;
        }
        const instruction = this.instructions[this.programCounter++];
        switch(instruction[1]) {
            case "set":
            this.memory.set(instruction[2], this.memory.get(instruction[4]));
            break;
            case "sub":
            if (instruction[2] === "h") {
                console.log('setting h', (this.memory.get(instruction[2]) - this.memory.get(instruction[4])));
            }
            this.memory.set(instruction[2], (this.memory.get(instruction[2]) - this.memory.get(instruction[4])));
            break;
            case "mul":
            this.mulCount++;
            this.memory.set(instruction[2], (this.memory.get(instruction[2]) * this.memory.get(instruction[4])));
            break;
            case "jnz":
            if (this.memory.get(instruction[2]) !== 0) {
                this.programCounter = (this.programCounter - 1) + this.memory.get(instruction[4]);
            }
            break;
            default:
            console.error('unknown instruction', instruction[1]);
            break;
        }
    }
}

export const coprocessorPart1 = (input) => {
    const instructions = input.split("\n");
    const processor = new Processor(instructions, true);
    while (processor.state === RUNNING) {
        processor.cycle();
    }
    return processor.mulCount;
}
