import globalBuffs from "../../data/globalBuffs.js";

export function calculateGlobalBuffs(
    targetOperator,
    selectedGlobalBuffs
) {
    let atkAdd = 0;

    selectedGlobalBuffs.forEach(selected => {
        const buff = globalBuffs.find(
            buffData => buffData.id === selected.id
        );

        if (!buff) return;

        if (
            buff.targetTag &&
            !targetOperator.tags.includes(buff.targetTag)
        ) {
            return;
        }

        let value = getModuleValue(buff, selected);

        for (
            let potential = 2;
            potential <= selected.potential;
            potential++
        ) {
            value += buff[`potential${potential}`] ?? 0;
        }

        atkAdd += value;
    });

    return atkAdd;
}

function getModuleValue(buff, selected) {
    if (selected.module === "none") {
        return buff.base;
    }

    const moduleValueKey =
        `modules${selected.module}${selected.moduleLevel}`;

    return buff[moduleValueKey] ?? buff.base;
}
