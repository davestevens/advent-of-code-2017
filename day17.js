// day17.js
// http://adventofcode.com/2017/day/17

export const spinlockPart1 = (input) => {
    const buffer = [0];
    let currentIndex = 0;
    for (let i = 1; i <= 2017; ++i) {
        const spliceIndex = (currentIndex + input) % i;
        buffer.splice(spliceIndex + 1, 0, i);
        currentIndex = spliceIndex + 1;
    }
    return buffer[currentIndex + 1];
}

export const spinlockPart2 = (input) => {
    let value = 0;
    let currentIndex = 0;
    for (let i = 1; i <= 50000000; ++i) {
        const spliceIndex = (currentIndex + input) % i;
        currentIndex = spliceIndex + 1;
        if (currentIndex === 1) {
            value = i;
        }
    }
    return value;
}