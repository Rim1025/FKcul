import inspirationBuffs from "../../data/inspirationBuffs.js";
import singleBuffs from "../../data/singleBuffs.js";
import {
    initInspirationSpecialSettings
} from "./special/index.js";
import {
    canApplySingleBuff
} from "../singleBuff/singleBuffRules.js";

export function initInspirationBuffList() {
    const area = document.getElementById("support-operator-list");

    if (!area) return;

    area.innerHTML = inspirationBuffs.map(operator => `
        <div
            class="support-operator-item"
            data-support-operator-id="${operator.id}"
        >
            <div class="support-operator-title">
                ${operator.name} ${operator.skill.name}
            </div>

            <details class="support-card-details" open>
                <summary>設定・計算結果</summary>
                <div class="support-card-content">
                    <div class="support-operator-settings"></div>
                    <div class="support-calculation-details"></div>
                </div>
            </details>
        </div>
    `).join("");

    inspirationBuffs.forEach(operator => {
        const item = area.querySelector(
            `[data-support-operator-id="${operator.id}"]`
        );

        initInspirationSpecialSettings(
            operator,
            item,
            singleBuffs.filter(
                buff => canApplySingleBuff(buff, operator)
            )
        );
    });
}
