// day1.js
// http://adventofcode.com/2017/day/1

const inverseCaptcha = (input, nextCharIndex) => {
    const characters = input.split("");
    return characters.reduce((memo, number, index) => {
        return memo + +((number === characters[nextCharIndex(characters, index) % characters.length]) ? number : 0);
    }, 0);
}

export const inverseCaptchaPart1 = (input) => {
    return inverseCaptcha(input, (_characters, index) => (index + 1));
}

export const inverseCaptchaPart2 = (input) => {
    return inverseCaptcha(input, (characters, index) => index + (characters.length / 2));
}
