import { calculateAttackDetails } from "./calcAtk.js";
import {
    calculateOperatorHitMultiplier,
    calculateOperatorSpecialIgnoreDef
} from "../operatorManager/operatorSpecial/index.js";
import {
    calculateInspirationAtks,
    getAppliedInspirationEffects
} from "./calcInspirationBuffs.js";
import {
    calculateSpecialHitDamage
} from "./special/index.js";

function calculateOperatorDamage(
    operator,
    selected,
    enemy,
    selectedOperators,
    selectedGlobalBuffs,
    inspirationAtks,
    debuffs
) {

    const inspirationEffects = getAppliedInspirationEffects(
        selected.singleBuffs,
        inspirationAtks
    );

    const attackDetails = calculateAttackDetails(
        operator,
        selected.potential,
        selected.module,
        selected.moduleLevel,
        selected.conditions,
        selectedOperators,
        selectedGlobalBuffs,
        selected.specialOptions,
        selected.singleBuffs,
        inspirationEffects.inspirationAtk,
        inspirationEffects.targetAtkAdd
    );
    const atk = attackDetails.finalAtk;

    const ignoreDef = getIgnoreDef(
        operator,
        selected.module,
        selected.moduleLevel,
        selected.conditions,
        selected.specialOptions
    );

    let totalDamage = 0;

    operator.skill.hits.forEach(hit => {

        if (
            hit.module &&
            (
                selected.module !== hit.module.name ||
                selected.moduleLevel < hit.module.minLevel
            )
        ) {
            return;
        }

        for (let i = 0; i < selected.hitCount; i++) {

            const hitMultiplier = calculateOperatorHitMultiplier(
                operator,
                hit,
                {
                    specialOptions: selected.specialOptions
                }
            );
            const hitDamage = atk * hitMultiplier / 100;

            const specialDamage = calculateSpecialHitDamage(
                hit.special,
                hitDamage
            );

            if (specialDamage !== null) {
                totalDamage += specialDamage;
                continue;
            }

            switch (hit.damage_type) {

                case "physical":

                    totalDamage += calculatePhysicalDamage(
                        hitDamage,
                        enemy,
                        ignoreDef,
                        debuffs
                    );

                    break;


                case "arts":

                    totalDamage += calculateArtsDamage(
                        hitDamage,
                        enemy,
                        debuffs
                    );

                    break;


                default:

                    console.warn(
                        "未対応ダメージタイプ:",
                        hit.damage_type
                    );
            }
        }
    });

    return {
        damage: totalDamage,
        attackDetails,
        ignoreDef
    };
}

export function calculateTotalDamage(
    selectedOperators,
    enemy,
    operatorData,
    selectedGlobalBuffs,
    selectedInspirations,
    debuffs = {}
) {

    return calculateDamageDetails(
        selectedOperators,
        enemy,
        operatorData,
        selectedGlobalBuffs,
        selectedInspirations,
        debuffs
    ).totalDamage;
}

export function calculateDamageDetails(
    selectedOperators,
    enemy,
    operatorData,
    selectedGlobalBuffs,
    selectedInspirations,
    debuffs = {}
) {

    let totalDamage = 0;
    const operatorResults = [];

    const inspirationAtks = calculateInspirationAtks(
        selectedInspirations,
        selectedOperators,
        selectedGlobalBuffs
    );

    selectedOperators.forEach(selected => {

        const operator = operatorData.find(
            op => op.id === selected.id
        );

        if (!operator) return;

        const result = calculateOperatorDamage(
            operator,
            selected,
            enemy,
            selectedOperators,
            selectedGlobalBuffs,
            inspirationAtks,
            debuffs
        );

        totalDamage += result.damage;
        operatorResults.push({
            id: operator.id,
            name: operator.name,
            ...result
        });
    });

    return {
        totalDamage,
        operatorResults,
        inspirationResults: inspirationAtks,
        finalEnemy: {
            hp: enemy.hp,
            def: Math.max(
                enemy.def * (1 - clampPercentage(debuffs.defReduction) / 100),
                0
            ),
            res: enemy.res * (
                1 - clampPercentage(debuffs.resReduction) / 100
            )
        }
    };
}

function getIgnoreDef(
    operator,
    moduleName,
    moduleLevel,
    conditions,
    specialOptions
) {

    let ignoreDef = 0;

    const specialIgnoreDef = calculateOperatorSpecialIgnoreDef(
        operator,
        {
            moduleName,
            moduleLevel,
            specialOptions
        }
    );

    if (
        moduleName === "none" ||
        !operator.modules?.[moduleName]
    ) {
        return ignoreDef + specialIgnoreDef;
    }

    const module = operator.modules[moduleName];

    const level = module[moduleLevel];

    if (!level) return ignoreDef + specialIgnoreDef;

    level.effects.forEach(effect => {

        if (effect.type !== "ignore_def") {
            return;
        }

        if (effect.condition) {

            if (
                !conditions.includes(
                    effect.condition.label
                )
            ) {
                return;
            }

        }

        ignoreDef += effect.value;

    });

    return ignoreDef + specialIgnoreDef;
}

function calculatePhysicalDamage(
    atk,
    enemy,
    ignoreDef,
    debuffs
) {

    const defReduction = clampPercentage(
        debuffs.defReduction
    );

    const def = Math.max(
        enemy.def * (1 - defReduction / 100) - ignoreDef,
        0
    );

    const damage = Math.max(
        atk - def,
        atk * 0.05
    );

    return damage * getDamageMultiplier(debuffs.fragile);
}

function calculateArtsDamage(
    atk,
    enemy,
    debuffs
) {

    const resReduction = clampPercentage(
        debuffs.resReduction
    );
    const res = enemy.res * (1 - resReduction / 100);

    const damage = Math.max(
        atk * (100 - res) / 100,
        atk * 0.05
    );

    return (
        damage
        * getDamageMultiplier(debuffs.fragile)
        * getDamageMultiplier(debuffs.artsDamageIncrease)
    );
}

function clampPercentage(value) {
    return Math.min(Math.max(Number(value) || 0, 0), 100);
}

function getDamageMultiplier(value) {
    return 1 + Math.max(Number(value) || 0, 0) / 100;
}
