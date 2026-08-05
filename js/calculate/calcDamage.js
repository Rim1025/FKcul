import { calculateAttack } from "./calcAtk.js";

function calculateOperatorDamage(
    operator,
    selected,
    enemy,
    selectedOperators,
    selectedGlobalBuffs
) {

    const atk = calculateAttack(
        operator,
        selected.potential,
        selected.module,
        selected.moduleLevel,
        selected.conditions,
        selectedOperators,
        selectedGlobalBuffs
    );

    const ignoreDef = getIgnoreDef(
        operator,
        selected.module,
        selected.moduleLevel,
        selected.conditions
    );

    let totalDamage = 0;

    operator.skill.hits.forEach(hit => {

        for (let i = 0; i < selected.hitCount; i++) {

            const hitDamage = atk * hit.multiplier / 100;

            switch (hit.damage_type) {

                case "physical":

                    totalDamage += calculatePhysicalDamage(
                        hitDamage,
                        enemy,
                        ignoreDef
                    );

                    break;


                case "arts":

                    totalDamage += calculateArtsDamage(
                        hitDamage,
                        enemy
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

    return totalDamage;
}

export function calculateTotalDamage(
    selectedOperators,
    enemy,
    operatorData,
    selectedGlobalBuffs
) {

    let totalDamage = 0;

    selectedOperators.forEach(selected => {

        const operator = operatorData.find(
            op => op.id === selected.id
        );

        if (!operator) return;

        totalDamage += calculateOperatorDamage(
            operator,
            selected,
            enemy,
            selectedOperators,
            selectedGlobalBuffs
        );
    });

    return totalDamage;
}

function getIgnoreDef(
    operator,
    moduleName,
    moduleLevel,
    conditions
) {

    let ignoreDef = 0;

    if (
        moduleName === "none" ||
        !operator.modules[moduleName]
    ) {
        return ignoreDef;
    }

    const module = operator.modules[moduleName];

    const level = module[moduleLevel];

    if (!level) return ignoreDef;

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

    return ignoreDef;
}

function calculatePhysicalDamage(
    atk,
    enemy,
    ignoreDef
) {

    const def = Math.max(
        enemy.def - ignoreDef,
        0
    );

    return Math.max(
        atk - def,
        atk * 0.05
    );
}

function calculateArtsDamage(
    atk,
    enemy
) {

    return Math.max(
        atk * (100 - enemy.res) / 100,
        atk * 0.05
    );
}