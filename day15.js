// day15.js
// http://adventofcode.com/2017/day/15

const MAGIC_NUMBER = 2147483647;
const GENERATOR_A_FACTOR = 16807;
const GENERATOR_B_FACTOR = 48271;

const createGenerator = (factor) => {
    return (input) => (factor * input) % MAGIC_NUMBER;
}

const createGeneratorWithMultipleCheck = (factor, multiple) => {
    const generator = createGenerator(factor);
    return (input) => {
        let i = generator(input);
        while(i % multiple) {
            i = generator(i);
        }
        return i;
    }
}

const findMatches = (input, generatorA, generatorB) => {
    let a = input.generatorA;
    let b = input.generatorB;
    let matches = 0;
    for (let i = 0; i < input.iterationCount; ++i) {
        a = generatorA(a);
        b = generatorB(b);
        matches += ((a & 0xffff) === (b & 0xffff)) ? 1 : 0;
    }
    return matches;
}

export const duelingGeneratorsPart1 = (input) => {
    return findMatches(
        input,
        createGenerator(GENERATOR_A_FACTOR),
        createGenerator(GENERATOR_B_FACTOR)
    );
}

export const duelingGeneratorsPart2 = (input) => {
    return findMatches(
        input,
        createGeneratorWithMultipleCheck(GENERATOR_A_FACTOR, 4),
        createGeneratorWithMultipleCheck(GENERATOR_B_FACTOR, 8)
    );
}
