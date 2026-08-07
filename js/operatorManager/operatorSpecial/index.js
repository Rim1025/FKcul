import {
    calculateBlazeEffects,
    getBlazeConditions
} from "./blaze.js";
import {
    calculateUlpianusEffects,
    getUlpianusOptions,
    updateUlpianusOptions
} from "./ulpianus.js";

const specialCalculators = {
    blaze: calculateBlazeEffects,
    ulpianus: calculateUlpianusEffects
};

const specialConditionGetters = {
    blaze: getBlazeConditions
};

export function calculateOperatorSpecialEffects(
    operator,
    context
) {
    const calculator = specialCalculators[operator.id];

    return calculator
        ? calculator(context)
        : {};
}

export function getOperatorSpecialConditions(operator) {
    const getConditions = specialConditionGetters[operator.id];

    return getConditions
        ? getConditions()
        : [];
}

const specialOptionRenderers = {
    ulpianus: updateUlpianusOptions
};

const specialOptionGetters = {
    ulpianus: getUlpianusOptions
};

export function updateOperatorSpecialOptions(
    operator,
    area,
    context
) {
    const previousOptions = operator
        ? getOperatorSpecialOptions(operator, area.closest(".operator-card"))
        : {};

    area.innerHTML = "";

    if (!operator) return;

    const renderOptions = specialOptionRenderers[operator.id];

    if (renderOptions) {
        renderOptions(area, {
            ...context,
            previousOptions
        });
    }
}

export function getOperatorSpecialOptions(operator, card) {
    if (!operator) return {};

    const getOptions = specialOptionGetters[operator.id];

    return getOptions
        ? getOptions(card)
        : {};
}
