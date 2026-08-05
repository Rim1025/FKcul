import operatorsData from "../data/operators.js";
import { calculateTotalDamage } from "./calculate/calcDamage.js";
import {
    getEnemyData,
    initUI
} from "./ui.js";
import { getSelectedOperators, } from "./operatorManager/getSelectedOperators.js";
import { getSelectedGlobalBuffs, } from "./globalBuff/getSelectedGlobalBuffs.js";


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

    const selectedGlobalBuffs = getSelectedGlobalBuffs();

    const damage =
        calculateTotalDamage(
            selectedOperators,
            enemy,
            operatorsData,
            selectedGlobalBuffs
        );

    const result = document.getElementById("result");

    const remainHp = enemy.hp - damage;

    result.innerHTML = `
    <h3>総ダメージ：${Math.floor(damage)}</h3>

    <p>
        ${remainHp <= 0
            ? "✅ 撃破可能"
            : `❌ 撃破不可<br>残りHP：${Math.ceil(remainHp)}`
        }
    </p>
`;
}

main();