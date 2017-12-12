// day12.js
// http://adventofcode.com/2017/day/12

const PATTERN = /(\d+) \<\-\> (((\d+),? ?)+)/;;

const parse = (memo, input) => {
    const match = input.match(PATTERN);
    memo[match[1]] = match[2].split(/,\s*/).map(node => node);
    return memo;
}

const traverse = (node, nodes, seen) => {
    seen.add(node);
    return nodes[node]
        .filter(child => !seen.has(child))
        .forEach(child => traverse(child, nodes, seen));
}

export const digitalPlumberPart1 = (input) => {
    const nodes = input.split("\n").reduce(parse, {});
    const group = new Set();
    traverse("0", nodes, group);
    return group.size;
}

export const digitalPlumberPart2 = (input) => {
    const nodes = input.split("\n").reduce(parse, {});
    let nodeList = Object.keys(nodes).map(node => node)
    let count = 0;
    while (nodeList.length) {
        const group = new Set();
        traverse(nodeList[0], nodes, group);
        nodeList = nodeList.filter(node => !group.has(node));
        ++count;
    }
    return count;
}