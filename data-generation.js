const fs = require('fs');

const generateRandomInteger = (max, delta = 0) => {
    return delta + Math.floor(Math.random() * max) + 1;
};

const generateItems = (count, options) => {
    const { maxRatio = 10, maxWeight = 500 } = options || {};
    const weights = [];
    const values = [];
    const ratios = [];

    for (let i = 0; i < count; i += 1) {
        const weight = generateRandomInteger(maxWeight);
        const value = generateRandomInteger(Math.floor(weight / maxRatio));
        const ratio = value / weight;

        weights.push(weight);
        values.push(value);
        ratios.push(ratio);
    }

    return {
        weights,
        values,
        ratios
    };
};

const writeItemsToFile = (file, count, options) => {
    const generatedData = generateItems(count, options);

    const logger = fs.createWriteStream(file)
    logger.write(JSON.stringify(generatedData))
    logger.end();
};

writeItemsToFile('./src/utils/data/data-1.json', 1000, { maxRatio: 10 })
writeItemsToFile('./src/utils/data/data-2.json', 1000, { maxRatio: 7 })
writeItemsToFile('./src/utils/data/data-3.json', 1000, { maxRatio: 3 })
