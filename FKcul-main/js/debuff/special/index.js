import {
    bindSuzuranOptions,
    calculateSuzuranFragile,
    createSuzuranOptions,
    getSuzuranOptions
} from "./suzuran.js";

const handlers = {
    suzuran: {
        create: createSuzuranOptions,
        bind: bindSuzuranOptions,
        get: getSuzuranOptions,
        calculate: calculateSuzuranFragile
    }
};

export function createDebuffSpecialOptions(debuff) {
    return handlers[debuff.special]?.create() ?? "";
}

export function bindDebuffSpecialOptions(debuff, item) {
    handlers[debuff.special]?.bind(item);
}

export function getDebuffSpecialOptions(debuff, item) {
    return handlers[debuff.special]?.get(item) ?? {};
}

export function calculateDebuffSpecialValue(
    debuff,
    selected
) {
    return handlers[debuff.special]?.calculate(selected);
}
