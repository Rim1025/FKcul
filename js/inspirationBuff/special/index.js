import {
    calculateSkadiConditionAtkAdd,
    getSkadiSettings,
    initSkadiSettings
} from "./skadi.js";
import {
    calculateHeidiConditionAtkAdd,
    calculateHeidiTargetAtkAdd,
    getHeidiSettings,
    initHeidiSettings
} from "./heidi.js";

const settingsInitializers = {
    skadi_the_corrupting_heart: initSkadiSettings,
    heidi: initHeidiSettings
};

const settingsGetters = {
    skadi_the_corrupting_heart: getSkadiSettings,
    heidi: getHeidiSettings
};

const atkAddCalculators = {
    skadi_the_corrupting_heart: calculateSkadiConditionAtkAdd,
    heidi: calculateHeidiConditionAtkAdd
};

const targetAtkAddCalculators = {
    heidi: calculateHeidiTargetAtkAdd
};

export function initInspirationSpecialSettings(
    operator,
    item,
    availableSelfBuffs
) {
    settingsInitializers[operator.id]?.(
        item,
        operator,
        availableSelfBuffs
    );
}

export function getInspirationBuffSettings() {
    return Object.values(settingsGetters).map(getSettings => (
        getSettings()
    ));
}

export function calculateInspirationSpecialAtkAdd(
    operator,
    settings
) {
    return atkAddCalculators[operator.id]?.(settings) ?? 0;
}

export function calculateInspirationTargetAtkAdd(
    operator,
    settings
) {
    return targetAtkAddCalculators[operator.id]?.(settings) ?? 0;
}
