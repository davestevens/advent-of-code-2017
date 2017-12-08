// day7.js
// http://adventofcode.com/2017/day/7

const PATTERN = /(\w+) \((\d+)\)( \-\> (((\w+),? ?)+))?/;

const parse = (input) => {
    const match = input.match(PATTERN);
    return {
        name: match[1],
        weight: +match[2],
        totalWeight: null,
        children: match[4] ? match[4].split(/\s*,\s*/) : [],
        parent: null
    };
}

const setup = (input) => {
    return input.reduce((memo, line) => {
        const parsedLine = parse(line);
        memo[parsedLine.name] = parsedLine;
        return memo;
    }, {});
}

const link = (data) => {
    Object.keys(data).forEach(key => {
        data[key].children.forEach(child => {
            data[child].parent = key;
        });
    });
    return data;
}

const findParent = (data) => Object.keys(data).find(key => !data[key].parent);

const calculateWeights = (parent, data) => {
    const node = data[parent];
    node.children.forEach(child => calculateWeights(child, data));
    node.totalWeight = node.weight + node.children.reduce((memo, child) => memo + data[child].totalWeight, 0);
}

const findUnbalancedNode = (parent, data) => {
    const node = data[parent];
    const children = node.children.map(child => data[child]);
    const childWeights = children.map(child => child.totalWeight);
    if ((new Set(childWeights).size) > 1) {
        const key = findOddOneOut(children).name;
        return findUnbalancedNode(key, data) || key;
    }
}

const findOddOneOut = (nodes) => {
    const values = nodes.reduce((memo, node) => {
        memo[node.totalWeight] = memo[node.totalWeight] ? memo[node.totalWeight] + 1 : 1; 
        return memo;
    }, {});
    let a = null;
    let b = null;
    Object.keys(values).forEach(value => {
        if (values[value] === 1) {
            b = +value;
        } else {
            a = +value;
        }
    });
    const toChange = nodes.find(child => child.totalWeight === b);
    return toChange;
}

const balanceNodes = (node, unbalancedChild, data) => {
    const children = data[node].children.filter(child => child !== unbalancedChild).map(child => data[child].totalWeight);
    const unbalanced = data[unbalancedChild];
    return unbalanced.weight - (unbalanced.totalWeight - children[0]);
}

export const recursiveCircusPart1 = (input) => {
    const data = setup(input);
    link(data);
    return findParent(data);
}

export const recursiveCircusPart2 = (input) => {
    const data = setup(input);
    link(data);
    const parent = findParent(data);
    calculateWeights(parent, data);
    const unbalanced = findUnbalancedNode(parent, data);
    return balanceNodes(data[unbalanced].parent, unbalanced, data);
}