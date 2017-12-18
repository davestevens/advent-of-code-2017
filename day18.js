// day18.js
// http://adventofcode.com/2017/day/18

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
const WAITING = "WAITING";

class Messages {
    constructor() {
        this.list = [];
    }

    isEmpty(id) {
        return this.list.filter(item => item.from !== id).length === 0 ;
    }

    receive(id) {
        const message = this.list.find(item => item.from !== id);
        this.list.splice(this.list.indexOf(message), 1);
        return message.value;
    }

    send(from, value) {
        this.list.push({ from, value });
    }
}

class Duet {
    constructor(id, instructions, onSnd, onRcv) {
        this.id = id;
        this.instructions = instructions.map(instruction => instruction.match(INSTRUCTION_MATCHER));
        this.onSnd = onSnd.bind(this);
        this.onRcv = onRcv.bind(this);
        this.memory = new Memory();
        this.memory.set("p", this.id);
        this.state = RUNNING;
        this.programCounter = 0;
    }

    cycle() {
        const instruction = this.instructions[this.programCounter++];
        switch(instruction[1]) {
            case "snd":
            this.onSnd(this.memory.get(instruction[2]));
            break;
            case "set":
            this.memory.set(instruction[2], this.memory.get(instruction[4]));
            break;
            case "add":
            this.memory.set(instruction[2], (this.memory.get(instruction[2]) + this.memory.get(instruction[4])));
            break;
            case "mul":
            this.memory.set(instruction[2], (this.memory.get(instruction[2]) * this.memory.get(instruction[4])));
            break;
            case "mod":
            this.memory.set(instruction[2], (this.memory.get(instruction[2]) % this.memory.get(instruction[4])));
            break;
            case "rcv":
            this.onRcv(instruction[2]);
            break;
            case "jgz":
            if (this.memory.get(instruction[2]) > 0) {
                this.programCounter = (this.programCounter - 1) + this.memory.get(instruction[4]);
            }
            break;
            default:
            console.error('unknown instruction', instruction[1]);
            break;
        }
    }
}

export const duetPart1 = function(input) {
    let sound = null;
    const onSnd = (value) => {
        sound = value;
    };
    const onRcv = function(value) {
        this.state = (this.memory.get(value) === 0) ? RUNNING : WAITING;
    };
    const instructions = input.split("\n");
    const duet = new Duet(0, instructions, onSnd, onRcv);
    while (duet.state === RUNNING) {
        duet.cycle();
    }
    return sound;
}

export const duetPart2 = (input) => {
    const instructions = input.split("\n");
    const messages = new Messages();
    let sendCount = 0;
    const onSnd = function(value) {
        messages.send(this.id, value);
        if (this.id === 1) { ++sendCount; }
    };
    const onRcv = function(value) {
        if (!messages.isEmpty(this.id)) {
            this.memory.set(value, messages.receive(this.id));
            this.state = RUNNING;
        } else {
            this.state = WAITING;
            this.programCounter--;
        }
    };

    const program0 = new Duet(0, instructions, onSnd, onRcv);
    const program1 = new Duet(1, instructions, onSnd, onRcv);

    while ((program0.state === RUNNING) || (program1.state === RUNNING)) {
        program0.cycle();
        program1.cycle();
    }

    return sendCount;
}