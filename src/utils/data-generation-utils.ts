
const generateRandomInteger = (max: number, delta: number = 0) => {
    return delta + Math.floor(Math.random() * max) + 1;
}

const generateItems = (
    count: number,
    options?: {
        maxRatio: number;
        maxWeight: number
    }
) => {
    const { maxRatio = 10, maxWeight = 500 } = options || {};
    const weights: number[] = [];
    const values: number[] = [];
    const ratios: number[] = [];

    for (let i = 0; i < count; i += 1) {
        const weight = generateRandomInteger(maxWeight);
        const value = generateRandomInteger(weight / maxRatio);
        const ratio = value / weight;

        weights.push(weight);
        values.push(value);
        values.push(ratio)
    }

    return {
        weights,
        values,
        ratios
    }
};

export {
    generateItems
}
