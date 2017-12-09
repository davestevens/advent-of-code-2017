// day9.js
// http://adventofcode.com/2017/day/9

const TOKEN_GROUP_START = "TOKEN_GROUP_START";
const TOKEN_GROUP_END = "TOKEN_GROUP_END";
const TOKEN_GROUP_DELIM = "TOKEN_GROUP_DELIM";
const TOKEN_GARBAGE_START = "TOKEN_GARBAGE_START";
const TOKEN_GARBAGE_END = "TOKEN_GARBAGE_END";
const TOKEN_IGNORE = "TOKEN_IGNORE";
const TOKEN_OTHER = "TOKEN_OTHER";

const TOKEN_LOOKUP = {
    "{": TOKEN_GROUP_START,
    "}": TOKEN_GROUP_END,
    ",": TOKEN_GROUP_DELIM,
    "<": TOKEN_GARBAGE_START,
    ">": TOKEN_GARBAGE_END,
    "!": TOKEN_IGNORE
};

class Token {
    constructor(character, index) {
        this.character = character;
        this.index = index;
    }

    set character(value) {
        this.token = value;
        this._character = value;
    }
    get character() { return this._character; }

    set token(value) { this._token = TOKEN_LOOKUP[value] || TOKEN_OTHER; }
    get token() { return this._token; }

    set index(value) { this._index = value; }
    get index() { return this._index; }
}

class Group {
    constructor(startToken, level) {
        this.startToken = startToken;
        this.level = level;
    }

    set endToken(value) {
        this._endToken = value;
    }
    get endToken() { return this._endToken; }
}

class StreamProcessor {
    constructor(input) {
        this.tokens = this.tokenize(input);
        this.groups = [];
        this.groupLevel = 0;
        this.garbageCount = 0;
    }

    get score() {
        return this.groups.reduce((memo, group) => memo + group.level, 0);
    }

    run() {
        let groupLevel = 0;
        for (let index = 0; index < this.tokens.length; ++index) {
            const token = this.tokens[index];
            switch (token.token) {
                case TOKEN_GROUP_START:
                this.groupStart(token);
                break;
                case TOKEN_GROUP_END:
                this.groupEnd(token);
                break;
                case TOKEN_GARBAGE_START:
                index = this.garbage(token);
                break;
                case TOKEN_IGNORE:
                index = ignore(token);
                break;
                case TOKEN_GROUP_DELIM:
                case TOKEN_OTHER:
                default:
                // Ignore token
                break;
            }
        }
    }

    tokenize(input) {
        return input.split("").map((character, index) => new Token(character, index));
    }

    groupStart(token) {
        this.groups.push(new Group(token, ++this.groupLevel));
    }

    groupEnd(token) {
        const group = this.groups[this.groups.length - 1];
        group.endToken = token;
        --this.groupLevel;
    }

    garbage(token) {
        let index = token.index + 1;
        for (let index = token.index + 1; index < this.tokens.length; ++index) {
            const t = this.tokens[index];
            switch (t.token) {
                case TOKEN_GARBAGE_END:
                return t.index;
                break;
                case TOKEN_IGNORE:
                index = this.ignore(t);
                break;
                default:
                ++this.garbageCount;
                break;
            } 
        }
    }

    ignore(token) {
        return token.index + 1;
    }
}

export const streamProcessing = (input) => {
    const streamProcessor = new StreamProcessor(input);
    streamProcessor.run();
    return streamProcessor;
}
