import inspirationBuffs from "../../data/inspirationBuffs.js";
import { calculateAttackDetails } from "./calcAtk.js";
import {
    calculateInspirationSpecialAtkAdd,
    calculateInspirationTargetAtkAdd
} from "../inspirationBuff/special/index.js";

export function calculateInspirationAtk(
    selectedInspiration,
    selectedOperators,
    selectedGlobalBuffs
) {
    return calculateInspirationAtkDetails(
        selectedInspiration,
        selectedOperators,
        selectedGlobalBuffs
    ).value;
}

export function calculateInspirationAtkDetails(
    selectedInspiration,
    selectedOperators,
    selectedGlobalBuffs
) {
    if (!selectedInspiration?.enabled) return {
        value: 0,
        attackDetails: null
    };

    const source = inspirationBuffs.find(
        operator => operator.id === selectedInspiration.id
    );

    if (!source) return {
        value: 0,
        attackDetails: null
    };

    const conditionAtkAdd = calculateInspirationSpecialAtkAdd(
        source,
        selectedInspiration
    );

    const attackDetails = calculateAttackDetails(
        source,
        selectedInspiration.potential,
        selectedInspiration.module,
        selectedInspiration.moduleLevel,
        [],
        selectedOperators,
        selectedGlobalBuffs,
        {},
        selectedInspiration.selfBuffs,
        0,
        conditionAtkAdd
    );

    return {
        value: attackDetails.finalAtk * source.skill.multiplier / 100,
        attackDetails
    };
}

export function calculateInspirationAtks(
    selectedInspirations = [],
    selectedOperators,
    selectedGlobalBuffs
) {
    return selectedInspirations
        .filter(selected => selected.enabled)
        .map(selected => {
            const source = inspirationBuffs.find(
                operator => operator.id === selected.id
            );

            const details = calculateInspirationAtkDetails(
                selected,
                selectedOperators,
                selectedGlobalBuffs
            );

            return {
                sourceId: selected.id,
                buffId: source?.buffId,
                targetAtkAdd: source
                    ? calculateInspirationTargetAtkAdd(
                        source,
                        selected
                    )
                    : 0,
                value: details.value,
                attackDetails: details.attackDetails
            };
        })
        .filter(result => result.buffId && result.value > 0);
}

export function getAppliedInspirationEffects(
    selectedSingleBuffs,
    inspirationAtks
) {
    const selectedIds = selectedSingleBuffs.map(selected => (
        typeof selected === "string"
            ? selected
            : selected.id
    ));
    const applicable = inspirationAtks.filter(
        inspiration => selectedIds.includes(inspiration.buffId)
    );

    return {
        inspirationAtk: applicable.length > 0
            ? Math.max(...applicable.map(inspiration => inspiration.value))
            : 0,
        targetAtkAdd: applicable.reduce(
            (total, inspiration) => (
                total + (inspiration.targetAtkAdd ?? 0)
            ),
            0
        )
    };
}
