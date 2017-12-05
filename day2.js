// day2.js
// http://adventofcode.com/2017/day/2

export const corruptionChecksumPart1 = (input) => {
    return input.reduce((memo, row) => {
        return memo + (Math.max(...row) - Math.min(...row));
    }, 0);
}

const findChecksum = (row) => {
    const sortedRow = row.sort((a, b) => a - b);
    for (let i = 0; i < sortedRow.length; ++i) {
        for (let j = i + 1; j < sortedRow.length; ++j) {
            if ((sortedRow[j] % sortedRow[i]) === 0) {
                return sortedRow[j] / sortedRow[i];
            }
        }
    }
    return 0;
}

export const corruptionChecksumPart2 = (input) => {
    return input.reduce((memo, row) => {
        return memo + findChecksum(row);
    }, 0);
}
