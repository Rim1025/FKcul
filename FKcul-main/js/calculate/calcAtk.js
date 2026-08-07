// js/calcAtk.js

import {
    calculateGlobalBuffs
} from "./calcGlobalBuffs.js";
import {
    calculateOperatorSpecialEffects
} from "../operatorManager/operatorSpecial/index.js";
import {
    calculateSingleBuffs
} from "./calcSingleBuffs.js";


export function calculateAttackDetails(
    operator,
    potential,
    moduleName,
    moduleLevel,
    conditions,
    selectedOperators,
    selectedGlobalBuffs,
    specialOptions = {},
    selectedSingleBuffs = [],
    inspirationAtk = 0,
    additionalAtkAdd = 0
) {
    // コピー
    let baseAtk = operator.atk;
    const talents = structuredClone(operator.talents ?? []);

    let atkAdd = 0;
    let atkMul = 1;

    // 潜在・モジュール
    function applyBaseEffects(
        effects,
        conditions = []
    ) {

        effects.forEach(effect => {

            if (effect.condition) {

                if (
                    !conditions.includes(
                        effect.condition.label
                    )
                ) {
                    return;
                }

            }

            switch (effect.type) {

                case "atk_flat":
                    baseAtk += effect.value;
                    break;

                case "tal_add": {

                    const talent = talents.find(
                        t => t.id === effect.target
                    );

                    if (!talent) break;

                    talent.effects.forEach(talentEffect => {

                        if (talentEffect.type === "atk_add") {

                            talentEffect.value += effect.value;

                        }

                        if (talentEffect.type === "atk_mul") {

                            talentEffect.value += effect.value;

                        }

                    });

                    break;
                }

                default:
                    console.warn("未対応effect:", effect.type);

            }

        });

    }

    // 素質・スキル

    function collectEffects(effects, conditions = []) {

        effects.forEach(effect => {

            if (effect.condition) {
                if (
                    !conditions.includes(
                        effect.condition.label
                    )
                ) {
                    return;
                }

            }

            switch (effect.type) {
                case "atk_add": {
                    atkAdd += effect.value;

                    break;
                }

                case "atk_mul":
                    atkMul *= effect.value / 100;
                    break;
            }
        });
    }

    // 潜在

    (operator.potential ?? []).forEach(p => {

        if (p.id <= potential) {

            applyBaseEffects(p.effects);

        }

    });

    // モジュール

    if (moduleName !== "none") {

        const module = operator.modules?.[moduleName];

        if (module) {

            const level = module[moduleLevel];

            if (level) {
                applyBaseEffects(
                    level.effects,
                    conditions
                );
            }

        }

    }

    // 素質

    talents.forEach(talent => {
        collectEffects(
            talent.effects,
            conditions
        );
    });

    // スキル攻撃力加算
    const specialEffects = calculateOperatorSpecialEffects(
        operator,
        {
            potential,
            moduleName,
            moduleLevel,
            conditions,
            selectedOperators,
            specialOptions
        }
    );

    baseAtk += specialEffects.baseAtkFlat ?? 0;

    atkAdd += specialEffects.skillAtkAdd
        ?? operator.skill.atk_add
        ?? 0;

    atkAdd += specialEffects.atkAdd ?? 0;

    atkMul *= specialEffects.atkMul ?? 1;

    atkAdd += calculateGlobalBuffs(
        operator,
        selectedGlobalBuffs
    );

    atkAdd += calculateSingleBuffs(
        selectedSingleBuffs,
        operator
    );

    atkAdd += additionalAtkAdd;

    const finalAtk = (
        baseAtk
        * (1 + atkAdd / 100)
        * atkMul
        + inspirationAtk
    );

    return {
        flatAtk: baseAtk,
        atkAdd,
        atkMul,
        inspirationAtk,
        finalAtk
    };

}

export function calculateAttack(...args) {
    return calculateAttackDetails(...args).finalAtk;
}
