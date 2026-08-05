// js/calcAtk.js

import {
    calculateGlobalBuffs
} from "./calcGlobalBuffs.js";


export function calculateAttack(
    operator,
    potential,
    moduleName,
    moduleLevel,
    conditions,
    selectedOperators,
    selectedGlobalBuffs
) {
    // コピー
    let baseAtk = operator.atk;
    const talents = structuredClone(operator.talents);

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

                    let value = effect.value;

                    // override確認
                    if (effect.override) {

                        effect.override.forEach(override => {

                            if (conditions.includes(override.condition)) {
                                value = override.value;
                            }

                        });

                    }

                    atkAdd += value;

                    break;
                }

                case "atk_mul":
                    atkMul *= effect.value / 100;
                    break;
            }
        });
    }

    // 潜在

    operator.potential.forEach(p => {

        if (p.id <= potential) {

            applyBaseEffects(p.effects);

        }

    });

    // モジュール

    if (moduleName !== "none") {

        const module = operator.modules[moduleName];

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
    const skillAtkAdd = operator.skill.atk_add;

    if (skillAtkAdd) {

        let value = skillAtkAdd.value;

        if (skillAtkAdd.override) {

            skillAtkAdd.override.forEach(override => {

                if (
                    conditions.includes(
                        override.condition
                    )
                ) {
                    value = override.value;
                }

            });

        }

        atkAdd += value;

    }

    atkAdd += calculateGlobalBuffs(
        operator,
        selectedGlobalBuffs
    );

    // 最終攻撃力
    console.log("基礎攻撃力：", baseAtk, ", 加算倍率：", atkAdd, ", 乗算倍率：", atkMul)
    console.log("最終威力：", baseAtk * (1 + atkAdd / 100) * atkMul)

    return (
        baseAtk
        * (1 + atkAdd / 100)
        * atkMul
    );

}