// js/ui.js

import { addOperatorCard, } from "./operatorManager/createOperatorCard.js";
import { initGlobalBuffList } from "./globalBuff/initGlobalBuffList.js"

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

    addOperatorCard(operatorData);
}

