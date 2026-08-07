import singleBuffs from "../../data/singleBuffs.js";

export function calculateSingleBuffs(selectedSingleBuffs) {
    let atkAdd = 0;

    selectedSingleBuffs.forEach(selectedId => {
        const buff = singleBuffs.find(
            buffData => buffData.id === selectedId
        );

        if (!buff) return;

        buff.effects.forEach(effect => {
            if (effect.type === "atk_add") {
                atkAdd += effect.value;
            }
        });
    });

    return atkAdd;
}
