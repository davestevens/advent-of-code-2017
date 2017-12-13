// day13.js
// http://adventofcode.com/2017/day/13

const parse = (memo, input) => {
    const [depth, range] = input.split(/\s*:\s*/);
    memo[+depth] = { range: +range, cycle: (+range * 2) - 2 };
    return memo;
}

const penalties = (times, firewall) => {
    return times.reduce((memo, { time, depth }) => {
        const isCaught = (time % firewall[depth].cycle) === 0;
        if (isCaught) {
            memo.push(depth * firewall[depth].range);
        }
        return memo;
    }, []);
}

export const packetScannersPart1 = (input) => {
    const firewall = input.split("\n").reduce(parse, {});
    const firewallKeys = Object.keys(firewall).map(key => +key);
    const times = firewallKeys.map(depth => ({ time: depth, depth }));
    return penalties(times, firewall).reduce((memo, severity) => memo + severity, 0);
}

/* Brute Force... */
export const packetScannersPart2 = (input) => {
    const firewall = input.split("\n").reduce(parse, {});
    const firewallKeys = Object.keys(firewall).map(key => +key);
    let time = -1;
    let times = [];

    do {
        time++;
        times = firewallKeys.map(depth => ({ time: depth + time, depth }));
    } while (penalties(times, firewall).length !== 0);

    return time;
}