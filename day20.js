// day20.js
// http://adventofcode.com/2017/day/20

const DESCRIPTION_MATCHER = /p=<(.+)>, v=<(.+)>, a=<(.+)>/;
const POINT_MATCHER = /(-?\d+),(-?\d+),(-?\d+)/;
const MAGIC_NUMBER = 400;

class Point {
    constructor(description) {
        const { x, y, z } = this.parse(description);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set x(value) { this._x = value; }
    get x() { return this._x; }

    set y(value) { this._y = value; }
    get y() { return this._y; }

    set z(value) { this._z = value; }
    get z() { return this._z; }

    parse(description) {
        const match = description.match(POINT_MATCHER);
        return {
            x: +match[1],
            y: +match[2],
            z: +match[3]
        }
    }

    toString() {
        return `${ this.x },${ this.y },${ this.z }`;
    }
}

class Particle {
    constructor(index, description) {
        const { position, velocity, acceleration } = this.parse(description);
        this.index = index;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }

    tick() {
        this.updateVelocity();
        this.updatePosition();
    }

    get distance() {
        return Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z);
    }

    updateVelocity() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
        this.velocity.z += this.acceleration.z;
    }

    updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.z += this.velocity.z;
    }

    parse(description) {
        const match = description.match(DESCRIPTION_MATCHER);
        return {
            position: new Point(match[1]),
            velocity: new Point(match[2]),
            acceleration: new Point(match[3])
        }
    }
}

class Particles {
    constructor(input) {
        this.particles = input.split("\n").map((particleDescription, index) => {
            return new Particle(index, particleDescription)
        });
    }

    tick() {
        this.particles.forEach(particle => particle.tick());
    }

    removeCollisions() {
        const positions = this.positions;
        this.particles = this.particles.filter(particle => {
            return positions[particle.position.toString()] === 1;
        });
    }

    get positions() {
        return this.particles.reduce((memo, particle) => {
            const position = particle.position.toString();
            memo[position] = position in memo ? memo[position] + 1 : 1;
            return memo;
        }, {});
    }

    get closest() {
        return this.particles.sort((a, b) => a.distance - b.distance)[0];
    }

    get length() {
        return this.particles.length;
    }
}

export const particleSwarmPart1 = (input) => {
    const particles = new Particles(input);

    let i = 0;
    do {
        particles.tick();
    } while (++i < MAGIC_NUMBER);

    return particles.closest.index;
}

export const particleSwarmPart2 = (input) => {
    const particles = new Particles(input);

    let i = 0;
    do {
        particles.tick();
        particles.removeCollisions();
    } while (++i < MAGIC_NUMBER);

    return particles.length;
}