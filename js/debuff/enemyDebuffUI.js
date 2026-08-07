import debuffs from "../../data/debuffs.js";
import {
    bindDebuffSpecialOptions,
    createDebuffSpecialOptions,
    getDebuffSpecialOptions
} from "./special/index.js";

export function initEnemyDebuffList() {
    const area = document.getElementById("enemy-debuff-list");
    if (!area) return;

    area.innerHTML = debuffs.map(debuff => `
        <div class="enemy-debuff-item" data-debuff-id="${debuff.id}">
            <label class="enemy-debuff-toggle">
                <input type="checkbox" class="enemy-debuff-check">
                ${debuff.name}
            </label>
            <div class="enemy-debuff-options" hidden>
                ${createDebuffSpecialOptions(debuff)}
            </div>
        </div>
    `).join("");

    area.querySelectorAll(".enemy-debuff-item").forEach(item => {
        const checkbox = item.querySelector(".enemy-debuff-check");
        const options = item.querySelector(".enemy-debuff-options");
        const debuff = debuffs.find(
            data => data.id === item.dataset.debuffId
        );

        function updateVisibility() {
            options.hidden = !checkbox.checked;
        }

        checkbox.addEventListener("change", updateVisibility);
        if (debuff) bindDebuffSpecialOptions(debuff, item);
        updateVisibility();
    });
}

export function getSelectedEnemyDebuffs() {
    return [...document.querySelectorAll(".enemy-debuff-item")]
        .filter(item => item.querySelector(".enemy-debuff-check").checked)
        .map(item => {
            const debuff = debuffs.find(
                data => data.id === item.dataset.debuffId
            );

            return {
                id: item.dataset.debuffId,
                ...(debuff
                    ? getDebuffSpecialOptions(debuff, item)
                    : {}
                )
            };
        });
}
