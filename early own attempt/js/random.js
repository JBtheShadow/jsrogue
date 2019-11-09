function randomBetween(low, high) {
    if (low > high) throw new Error("low must be lower than high");

    return Math.round(Math.random() * (high - low) + low);
}

function diceRoll(amount, sides, modifier) {
    let sum = 0;
    for (let i = 0; i < amount; i++) {
        sum += randomBetween(1, sides);
    }
    
    if (modifier) {
        sum += modifier;
    }
    
    return sum;
}

function diceRollForRange(low, high, modifier) {
    if (low > high) throw new Error("low must be lower than high");

    let shift = 0;
    if (low < 1) {
        shift += 1 - low;
        low = 1
        high += shift;
    }

    let amount = low;
    let sides = Math.floor(high / low);
    let extra = high % low;
    let value = diceRoll(amount - extra, sides) + diceRoll(extra, sides + 1);
    
    if (shift) {
        value -= shift;
    }
    
    if (modifier) {
        value += modifier;
    }
    
    return value;
}

function randomPick(items, weights) {
    if (!items) {
        return null;
    }

    if (!weights) {
        return items[randomBetween(0, items.length-1)];
    }

    if (weights.length < items.length) {
        for (let i = weights.length; i < items.length; i++) {
            weights[i] = 1;
        }
    }

    let sum = weights.reduce(function(acc, el) {
        return acc + el;
    }, 0);

    let value = randomBetween(0, sum - 1);
    let index = 0;
    let total = 0;
    while (index < items.length) {
        total += (weights[index] || 0);
        if (total > value) {
            return items[index];
        }
        index++;
    }

    return null;
}

