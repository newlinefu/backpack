import { GeneratedData } from '../types/general-types';

const dataToCombinedObject = (data: GeneratedData): { w: number; v: number; r: number }[] => {
    return data.values.map((d, i) => ({
        w: data.weights[i],
        v: d,
        r: data.ratios[i]
    }));
};

const sortItemsByValue = (data: GeneratedData, desc = false): GeneratedData => {
    const items = dataToCombinedObject(data).sort((a, b) => (desc ? b.v - a.v : a.v - b.v));

    return {
        ratios: items.map((i) => i.r),
        values: items.map((i) => i.v),
        weights: items.map((i) => i.w)
    };
};

const sortItemsByWeight = (data: GeneratedData, desc = false): GeneratedData => {
    const items = dataToCombinedObject(data).sort((a, b) => (desc ? b.w - a.w : a.w - b.w));

    return {
        ratios: items.map((i) => i.r),
        values: items.map((i) => i.v),
        weights: items.map((i) => i.w)
    };
};

const sortItemsByRatio = (data: GeneratedData, desc = false): GeneratedData => {
    const items = dataToCombinedObject(data).sort((a, b) => (desc ? b.r - a.r : a.r - b.r));

    return {
        ratios: items.map((i) => i.r),
        values: items.map((i) => i.v),
        weights: items.map((i) => i.w)
    };
};

const solve = (backpackSize: number, data: GeneratedData) => {
    const sortedByRatio = sortItemsByRatio(data, true);

    let actualSize = 0;
    const indexes = [];
    for (let i = 0; i < sortedByRatio.weights.length; i += 1) {
        const itemW = sortedByRatio.weights[i];
        if (backpackSize < actualSize + itemW) {
            break;
        }
        actualSize += itemW;
        indexes.push(i);
    }

    return {
        actualSize,
        indexes
    };
};

const solveEpsilon = (epsilon: number, backpackSize: number, data: GeneratedData) => {
    const OPT = backpackSize;
    const transformedItems = dataToCombinedObject(data);

    const expensive: typeof transformedItems = [];
    const mostExpensive: typeof transformedItems = [];
    const other: typeof transformedItems = [];
    transformedItems.forEach((item) => {
        if (item.v >= epsilon * OPT) {
            if (item.v <= 1 / epsilon) {
                mostExpensive.push(item);
            } else {
                expensive.push(item);
            }
        } else {
            other.push(item);
        }
    });

    let actualSize = 0;

    while (actualSize <= backpackSize && (mostExpensive.length || expensive.length)) {
        if (mostExpensive.length) {
            if (actualSize + mostExpensive[0].w > backpackSize) {
                break;
            }
            actualSize += mostExpensive.shift()?.w || 0;
        } else if (expensive.length) {
            if (actualSize + expensive[0].w > backpackSize) {
                break;
            }
            actualSize += expensive.shift()?.w || 0;
        }
    }

    const sortedByRatioOther = transformedItems.sort((a, b) => b.r - a.r);
    for (let i = 0; i < sortedByRatioOther.length; i += 1) {
        const itemW = sortedByRatioOther[i].w;
        if (backpackSize < actualSize + itemW) {
            break;
        }
        actualSize += itemW;
    }

    return actualSize;
};

export { sortItemsByRatio, sortItemsByValue, sortItemsByWeight, solve, solveEpsilon };
