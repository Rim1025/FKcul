import operatorsData from "../data/operators.js";
import { calculateDamageDetails } from "./calculate/calcDamage.js";
import {
    getEnemyData,
    initUI
} from "./ui.js";
import { getSelectedOperators, } from "./operatorManager/getSelectedOperators.js";
import { getSelectedGlobalBuffs, } from "./globalBuff/getSelectedGlobalBuffs.js";
import {
    getInspirationBuffSettings
} from "./inspirationBuff/special/index.js";
import { getSelectedEnemyDebuffs } from "./debuff/enemyDebuffUI.js";
import { calculateEnemyDebuffs } from "./calculate/calcEnemyDebuffs.js";
import {
    renderCalculationResults
} from "./result/renderCalculationResults.js";


function main() {

    initUI(operatorsData);

    document
        .getElementById("calculate-btn")
        .addEventListener(
            "click",
            onCalculate
        );
}

function onCalculate() {

    const selectedOperators = getSelectedOperators();

    const enemy = getEnemyData();

    const debuffs = calculateEnemyDebuffs(
        getSelectedEnemyDebuffs()
    );

    const selectedGlobalBuffs = getSelectedGlobalBuffs();

    const selectedInspirations = getInspirationBuffSettings();

    const calculation =
        calculateDamageDetails(
            selectedOperators,
            enemy,
            operatorsData,
            selectedGlobalBuffs,
            selectedInspirations,
            debuffs
        );

    renderCalculationResults(calculation);
}

main();
