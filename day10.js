// day10.js
// http://adventofcode.com/2017/day/10

class Data {
    constructor(size) {
        this.list = Array.apply(null, Array(size)).map((_value, i) => i);
    }

    getValue(index) {
        return this.list[index % this.list.length];
    }

    setValue(index, value) {
        this.list[index % this.list.length] = value;
    }
    
    switchValues(a, b) {
        const aValue = this.getValue(a);
        this.setValue(a, this.getValue(b));
        this.setValue(b, aValue);
    }
}

const NUMBER_OF_ROUNDS = 64;
const LENGTHS_SUFFIX = [17, 31, 73, 47, 23];

export class KnotHash {
    constructor(size = 256) {
        this.sparseHash = new Data(size);

        this.currentPosition = 0;
        this.skipSize = 0;
    }

    run(lengths) {
        this.currentPosition = 0;
        this.skipSize = 0;  
        let parsedLengths = this.parseLengths(lengths).concat(LENGTHS_SUFFIX);
        for (let round = 0; round < NUMBER_OF_ROUNDS; ++round) {
            this.round([].concat(parsedLengths));
        }
    }

    round(lengths) {
        do {
            this.perform(lengths.shift());
        } while(lengths.length);
    }

    perform(length) {
        this.reverse(length - 1);
        this.updateCurrentPosition(length);
        this.increaseSkipSize();
    }

    reverse(length) {
        for (let i = 0; i < length / 2; ++i) {
            this.sparseHash.switchValues(
                this.currentPosition + i,
                this.currentPosition + (length - i)
            );
        }
    }

    updateCurrentPosition(length) {
        this.currentPosition = (this.currentPosition + length + this.skipSize);
    }

    increaseSkipSize(length) {
        this.skipSize++;
    }

    get value() {
        return this.sparseHash.getValue(0) * this.sparseHash.getValue(1);
    }

    get hash() {
        const sparseHash = [].concat(this.sparseHash.list);
        const blocks = [];
        while (sparseHash.length) {
            const block = sparseHash.splice(0, 16);
            blocks.push(
                block.reduce((memo, item) => memo ^ item, 0)
            );
        }
        return blocks.map(block => ("00" + block.toString(16)).substr(-2)).join("");
    }

    parseLengths(lengths) {
        return lengths.split("").map(char => char.charCodeAt(0));
    }
}

export const knotHashPart1 = (input) => {
    const knotHash = new KnotHash(input.size);
    knotHash.round(input.lengths);
    return knotHash.value;
}


export const knotHashPart2 = (input) => {
    const knotHash = new KnotHash(256);
    knotHash.run(input);
    return knotHash.hash;
}