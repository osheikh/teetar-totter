// modules
import {
    v4
} from 'uuid'

// constants
import {
    MIN_WEIGHT,
    MAX_WEIGHT,
    TEETER_TOTTER_WIDTH,
    SHAPE_COUNT
} from '../services/constantsService'

export function generateRandomBlock() {
    const id = v4(); // simple & fast generation of RFC4122 UUIDS.
    const type = Math.floor(Math.random() * SHAPE_COUNT);
    const weight = Math.floor(Math.random() * MAX_WEIGHT) + MIN_WEIGHT;
    const offset = Math.floor(Math.random() * TEETER_TOTTER_WIDTH / 2) + 1;
    const height = weight * 8;
    return {
        id,
        type,
        weight,
        offset,
        height
    }
}

// blocks total weight and offset of where they are place, left or right
export function getBlockPower(array) {
    return array.reduce((acc, item) => {
        return acc += item.weight * item.offset
    }, 0)
}

// blocks total weight where they are place, left or right
export function getBlockWeight(array) {
    return array.reduce((acc, item) => {
        return acc += item.weight;
    }, 0)
}

// momentum is defined as the product of mass and velocity i.e. p = mv
export function getBlockMomentum(block) {
    if (block) {
        const accelerationDueToGravity = 9.8;
        const velocity = Math.sqrt(2 * accelerationDueToGravity * block.height); // velocity to hit the swing bar 
        return (block.weight * velocity).toFixed(2);
    }
    return 0
}