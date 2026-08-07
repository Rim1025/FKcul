import singleBuffs from "../../data/singleBuffs.js";
import { canApplySingleBuff } from "../singleBuff/singleBuffRules.js";
import {
    calculateSingleBuffSpecialValue
} from "../singleBuff/special/index.js";

export function calculateSingleBuffs(
    selectedSingleBuffs,
    targetOperator
) {
    let atkAdd = 0;

    selectedSingleBuffs.forEach(selected => {
        const selectedId = typeof selected === "string"
            ? selected
            : selected.id;
        const count = typeof selected === "string"
            ? 1
            : selected.count ?? 1;

        const buff = singleBuffs.find(
            buffData => buffData.id === selectedId
        );

        if (!buff || !canApplySingleBuff(buff, targetOperator)) return;

        buff.effects.forEach(effect => {
            if (effect.type === "atk_add") {
                const specialValue = calculateSingleBuffSpecialValue(
                    buff,
                    selected
                );
                atkAdd += (specialValue ?? effect.value) * count;
            }
        });
    });

    return atkAdd;
}
