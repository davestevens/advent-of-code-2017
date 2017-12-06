// day6.js
// http://adventofcode.com/2017/day/6

class MemoryReallocation {
    constructor(banks) {
        this.banks = banks;
        this.numberOfBanks = banks.length;
        this.seen = {};
    }

    run() {
        let count = 0;
        while (!this.seenBefore(count)) {
            this.execute();
            ++count;
        }
        return count;
    }

    execute() {
        let { index, value } = this.getLargestBank();
        this.banks[index] = 0;
        while (value--) {
            this.banks[++index % this.numberOfBanks]++;
        }
    }

    seenBefore(cycle) {
        const memory = this.getMemoryId();
        if (this.seen[memory]) {
            this.seen[memory] = cycle - this.seen[memory];
            return true;
        } else {
            this.seen[memory] = cycle;
            return false;
        }
    }

    getLargestBank() {
        const value = Math.max(...this.banks);
        const index = this.banks.indexOf(value);
        return { index, value };
    }

    getMemoryId() {
        return this.banks.join("");
    }
}

export const memoryReallocationPart1 = (input) => {
    return new MemoryReallocation(input).run();
}

export const memoryReallocationPart2 = (input) => {
    const memoryReallocation = new MemoryReallocation(input)
    memoryReallocation.run();
    return memoryReallocation.seen[memoryReallocation.getMemoryId()];
}