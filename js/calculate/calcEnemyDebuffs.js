import debuffs from "../../data/debuffs.js";
import {
    calculateDebuffSpecialValue
} from "../debuff/special/index.js";

function combineReductions(values) {
    const remaining = values.reduce(
        (total, value) => (
            total * (1 - Math.min(Math.max(value, 0), 100) / 100)
        ),
        1
    );
    return (1 - remaining) * 100;
}

function combineDamageIncreases(values) {
    const multiplier = values.reduce(
        (total, value) => total * (1 + Math.max(value, 0) / 100),
        1
    );
    return (multiplier - 1) * 100;
}

export function calculateEnemyDebuffs(selectedDebuffs) {
    const values = {
        def_reduction: [],
        res_reduction: [],
        fragile: [],
        arts_damage_increase: []
    };

    selectedDebuffs.forEach(selected => {
        const debuff = debuffs.find(data => data.id === selected.id);
        debuff?.effects.forEach(effect => {
            const specialValue = calculateDebuffSpecialValue(
                debuff,
                selected
            );
            values[effect.type]?.push(specialValue ?? effect.value);
        });
    });

    return {
        defReduction: combineReductions(values.def_reduction),
        resReduction: combineReductions(values.res_reduction),
        fragile: Math.max(0, ...values.fragile),
        artsDamageIncrease: combineDamageIncreases(
            values.arts_damage_increase
        )
    };
}
