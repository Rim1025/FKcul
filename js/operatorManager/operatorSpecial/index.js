import {
    calculateBlazeEffects,
    getBlazeIgnoreDef,
    getBlazeOptions,
    updateBlazeOptions
} from "./blaze.js";
import {
    calculateUlpianusEffects,
    getUlpianusOptions,
    updateUlpianusOptions
} from "./ulpianus.js";
import {
    calculateLemuenEffects,
    getLemuenHitMultiplier,
    getLemuenOptions,
    updateLemuenOptions
} from "./lemuen.js";
import {
    calculateFirewatchEffects,
    getFirewatchOptions,
    updateFirewatchOptions
} from "./firewatch.js";

const specialCalculators = {
    blaze: calculateBlazeEffects,
    firewatch: calculateFirewatchEffects,
    lemuen: calculateLemuenEffects,
    ulpianus: calculateUlpianusEffects
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

const specialIgnoreDefCalculators = {
    blaze: getBlazeIgnoreDef
};

export function calculateOperatorSpecialIgnoreDef(
    operator,
    context
) {
    const calculator = specialIgnoreDefCalculators[operator.id];

    return calculator
        ? calculator(context)
        : 0;
}

const specialHitMultiplierCalculators = {
    lemuen: getLemuenHitMultiplier
};

export function calculateOperatorHitMultiplier(
    operator,
    hit,
    context
) {
    const calculator = specialHitMultiplierCalculators[operator.id];

    return calculator
        ? calculator(hit, context)
        : hit.multiplier;
}

export function getOperatorSpecialConditions(operator) {
    return [];
}

const specialOptionRenderers = {
    blaze: updateBlazeOptions,
    firewatch: updateFirewatchOptions,
    lemuen: updateLemuenOptions,
    ulpianus: updateUlpianusOptions
};

const specialOptionGetters = {
    blaze: getBlazeOptions,
    firewatch: getFirewatchOptions,
    lemuen: getLemuenOptions,
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
