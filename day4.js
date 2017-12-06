// day4.js
// http://adventofcode.com/2017/day/4

export const highEntropyPassphrasesPart1 = (input) => {
    const words = input.split(/\s+/);
    const set = new Set(words);
    return set.size === words.length;
}

export const highEntropyPassphrasesPart2 = (input) => {
    const words = input.split(/\s+/).map(word => word.split("").sort().join());
    const set = new Set(words);
    return set.size === words.length;
}
