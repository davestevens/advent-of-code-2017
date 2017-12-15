// day8.js

const MODIFIERS = {
    "inc": (a, b) => a + b,
    "dec": (a, b) => a - b
};

const COMPARISONS = {
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "==": (a, b) => a == b,
    "!=": (a, b) => a != b
};

class Memory {
    constructor() {
        this.registers = {};
        this.highestValue = 0;
    }

    get(register) {
        return this.registers[register] || 0;
    }

    set(register, value) {
        this.highestValue = (value > this.highestValue) ? value : this.highestValue;
        this.registers[register] = value;
    }
}

const INSTRUCTION_PATTERN = /(\w+) (inc|dec) (-?\d+) if (\w+) ([><!=]+) (-?\d+)/;

class Instruction {
    constructor(text) {
        const match = text.match(INSTRUCTION_PATTERN);
        this.condition = this.buildCondition(match[4], match[5], +match[6]);
        this.evaluate = this.buildEvaluation(match[1], match[2], +match[3]);
    }

    run(memory) {
        if (this.condition(memory)) {
            this.evaluate(memory);
        }
    }

    buildCondition(register, comparison, value) {
        const func = COMPARISONS[comparison];
        return (memory) => func(memory.get(register), value);
    }

    buildEvaluation(register, modifier, value) {
        const func = MODIFIERS[modifier];
        return (memory) => memory.set(register, func(memory.get(register), value));
    }
}

class Processor {
    constructor(instructions) {
        this.memory = new Memory();
        this.instructions = instructions.map(instruction => new Instruction(instruction));
    }

    run() {
        this.instructions.forEach(instruction => {
            instruction.run(this.memory);
        });
    }
}

export const registerProgramPart1 = (input) => {
    const processor = new Processor(input);
    processor.run();
    return Math.max(...Object.keys(processor.memory.registers).map(register => processor.memory.get(register)));
}

export const registerProgramPart2 = (input) => {
    const processor = new Processor(input);
    processor.run();
    return processor.memory.highestValue;
}
