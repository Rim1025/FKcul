// js/ui.js

import { addOperatorCard, } from "./operatorManager/createOperatorCard.js";
import { initGlobalBuffList } from "./globalBuff/initGlobalBuffList.js"
import { initInspirationBuffList } from "./inspirationBuff/initInspirationBuffList.js";
import { initEnemyDebuffList } from "./debuff/enemyDebuffUI.js";

export function getEnemyData() {

    return {
        hp: Number(
            document.getElementById("enemy-hp").value
        ),

        def: Number(
            document.getElementById("enemy-def").value
        ),

        res: Number(
            document.getElementById("enemy-res").value
        )
    };
}

export function initUI(operatorData) {
    document
        .getElementById("add-operator")
        .addEventListener(
            "click",
            () => { addOperatorCard(operatorData); }
        );

    initGlobalBuffList();
    initInspirationBuffList();
    initEnemyDebuffList();

    addOperatorCard(operatorData);
}

