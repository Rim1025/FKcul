import {
    bindWindflitOptions,
    calculateWindflitAtkAdd,
    createWindflitOptions,
    getWindflitOptions
} from "./windflit.js";

const handlers = {
    windflit: {
        create: createWindflitOptions,
        bind: bindWindflitOptions,
        get: getWindflitOptions,
        calculate: calculateWindflitAtkAdd
    }
};

export function createSingleBuffSpecialOptions(buff) {
    return handlers[buff.special]?.create() ?? "";
}

export function bindSingleBuffSpecialOptions(buff, item) {
    handlers[buff.special]?.bind(item);
}

export function getSingleBuffSpecialOptions(buff, item) {
    return handlers[buff.special]?.get(item) ?? {};
}

export function calculateSingleBuffSpecialValue(
    buff,
    selected
) {
    return handlers[buff.special]?.calculate(selected);
}
