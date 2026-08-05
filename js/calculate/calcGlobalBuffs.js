// calcGlobalBuffs.js

export function calculateGlobalBuffs(
    targetOperator,
    selectedGlobalBuffs
) {

    let atkAdd = 0;


    const defenderBuff =
        selectedGlobalBuffs.find(
            buff => buff.id === "defender_buff"
        );


    if (defenderBuff) {

        atkAdd += calculateDefenderBuff(
            targetOperator,
            defenderBuff
        );

    }


    return atkAdd;
}


function calculateDefenderBuff(
    targetOperator,
    buff
) {

    // 重装以外は対象外
    if (
        !targetOperator.tags.includes("defender")
    ) {
        return 0;
    }


    let value = 20;


    // モジュールで置換
    if (buff.module === "X") {

        if (buff.moduleLevel === 2) {
            value = 25;
        }

        if (buff.moduleLevel === 3) {
            value = 28;
        }

    }


    // 潜在は加算
    if (buff.potential >= 3) {
        value += 3;
    }


    return value;
}