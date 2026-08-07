import {
    updateOperator,
    updatePotential,
    updateModule,
    updateModuleLevel,
    updateConditions
} from "./updateOperatorCard.js";
import { syncHornDefenderBuff } from "../globalBuff/updateGlobalBuff.js";
import {
    updateOperatorSpecialOptions
} from "./operatorSpecial/index.js";
import singleBuffs from "../../data/singleBuffs.js";
import inspirationBuffs from "../../data/inspirationBuffs.js";
import {
    bindSingleBuffItems,
    createSingleBuffItem
} from "../singleBuff/singleBuffUI.js";
import {
    canApplySingleBuff
} from "../singleBuff/singleBuffRules.js";

export function createOperatorCard(operatorData) {

    const card = document.createElement("div");

    card.className = "operator-card";

    card.innerHTML = `
        <button class="remove-btn">×</button>

        <select class="operator-select">

            <option value="">
                オペレーターを選択
            </option>

            ${operatorData.map(op => `
                <option value="${op.id}">
                    ${op.name}
                </option>
            `).join("")}

        </select>

        <div class="skill-name"></div>

        <details class="operator-card-details" open>
        <summary>設定・計算結果</summary>

        <div class="operator-card-content">
        <select class="potential" hidden></select>


        <div class="hit-count-area">
            <label>攻撃回数</label>
            <select class="hit-count"></select>
        </div>

        <div class="module-area">

        <label>モジュール</label>
        <select class="module"></select>

        </div>

        <div class="module-level-area">

            <label>レベル</label>

            <select class="module-level"></select>

        </div>

        <div class="talents"></div>

        <div class="special-options"></div>

        <div class="conditions"></div>

        <div class="single-buff-area"></div>

        <div class="operator-calculation-details"></div>
        </div>
        </details>
    `;

    const operatorSelect = card.querySelector(".operator-select");

    const conditionArea = card.querySelector(".conditions");
    const specialOptionsArea = card.querySelector(".special-options");
    const singleBuffArea = card.querySelector(".single-buff-area");

    const skillName = card.querySelector(".skill-name");

    const hitCountArea = card.querySelector(".hit-count-area");

    const hitCountSelect = card.querySelector(".hit-count");

    hitCountArea.style.display = "none";

    const potentialSelect = card.querySelector(".potential");

    const moduleArea = card.querySelector(".module-area");
    const moduleSelect = card.querySelector(".module");
    moduleArea.style.display = "none";

    const moduleLevelArea = card.querySelector(".module-level-area");
    const moduleLevelSelect = card.querySelector(".module-level");
    moduleLevelArea.style.display = "none";

    bindCardEvents(
        operatorData,
        card,
        operatorSelect,
        potentialSelect,
        skillName,
        hitCountArea,
        hitCountSelect,
        moduleArea,
        moduleSelect,
        moduleLevelArea,
        moduleLevelSelect,
        specialOptionsArea,
        singleBuffArea,
        conditionArea
    );

    return card;
}

export function addOperatorCard(operatorData) {

    const list = document.getElementById("operator-list");

    list.appendChild(
        createOperatorCard(operatorData)
    );

    updateOperator(operatorData);
}

function bindCardEvents(
    operatorData,
    card,
    operatorSelect,
    potentialSelect,
    skillName,
    hitCountArea,
    hitCountSelect,
    moduleArea,
    moduleSelect,
    moduleLevelArea,
    moduleLevelSelect,
    specialOptionsArea,
    singleBuffArea,
    conditionArea
) {

    function getCurrentOperator() {

        return operatorData.find(
            op => op.id === operatorSelect.value
        );
    }

    function updateHitCount(operator) {

        hitCountArea.style.display = "none";
        hitCountSelect.innerHTML = "";

        if (!operator?.skill.hitCount) {
            return;
        }

        const hitCount =
            operator.skill.hitCount;

        for (
            let i = hitCount.min;
            i <= hitCount.max;
            i++
        ) {

            hitCountSelect.innerHTML += `
            <option value="${i}">
                ${i}回
            </option>
        `;
        }

        hitCountSelect.value =
            String(hitCount.default);

        hitCountArea.style.display = "";
    }

    function refreshConditions() {

        updateConditions(
            getCurrentOperator(),
            moduleSelect.value,
            Number(moduleLevelSelect.value || 0),
            conditionArea
        );
    }

    function refreshSpecialOptions() {
        updateOperatorSpecialOptions(
            getCurrentOperator(),
            specialOptionsArea,
            {
                potential: Number(potentialSelect.value || 1),
                moduleName: moduleSelect.value,
                moduleLevel: Number(moduleLevelSelect.value || 0)
            }
        );
    }

    function refreshSingleBuffs() {
        const operator = getCurrentOperator();
        const inspirationBuffOptions = inspirationBuffs.map(source => ({
            id: source.buffId,
            name: `${source.name} ${source.skill.name}（鼓舞）`
        }));
        const availableBuffs = [
            ...singleBuffs.filter(
                buff => canApplySingleBuff(buff, operator)
            ),
            ...inspirationBuffOptions
        ];

        singleBuffArea.innerHTML = "";

        if (!operator) return;

        singleBuffArea.innerHTML = `
            <div>バフ</div>
            ${availableBuffs.map(createSingleBuffItem).join("")}
        `;

        bindSingleBuffItems(singleBuffArea);

    }

    function syncHornBuff() {

        const operator =
            getCurrentOperator();

        if (
            !operator ||
            operator.id !== "horn"
        ) {
            return;
        }

        syncHornDefenderBuff(
            Number(potentialSelect.value),
            moduleSelect.value,
            Number(moduleLevelSelect.value || 0)
        );
    }

    operatorSelect.addEventListener("change", () => {

        const operator = getCurrentOperator();

        potentialSelect.hidden = !operator;

        skillName.textContent =
            operator
                ? `スキル：${operator.skill.name}`
                : "";

        updatePotential(
            operator,
            potentialSelect
        );

        updateHitCount(operator);

        updateModule(
            operator,
            moduleArea,
            moduleSelect,
            moduleLevelArea,
            moduleLevelSelect
        );

        refreshConditions();
        refreshSpecialOptions();
        refreshSingleBuffs();

        updateOperator(operatorData);

        syncHornBuff();
    });

    potentialSelect.addEventListener("change", () => {

        refreshSpecialOptions();
        syncHornBuff();

    });

    moduleSelect.addEventListener("change", () => {

        const operator = getCurrentOperator();

        updateModuleLevel(
            operator,
            moduleSelect.value,
            moduleLevelArea,
            moduleLevelSelect
        );

        refreshConditions();
        refreshSpecialOptions();

        syncHornBuff();
    });

    moduleLevelSelect.addEventListener("change", () => {

        refreshConditions();
        refreshSpecialOptions();

        syncHornBuff();
    });

    card
        .querySelector(".remove-btn")
        .addEventListener("click", () => {

            card.remove();
            updateOperator(operatorData);

        });
}
