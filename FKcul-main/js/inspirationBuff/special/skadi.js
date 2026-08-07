import {
    bindSingleBuffItems,
    createSingleBuffItem,
    getSelectedSingleBuffs
} from "../../singleBuff/singleBuffUI.js";

function createSettingsHTML(operator, availableSelfBuffs) {
    const defaultPotential = operator.potential.at(-1)?.id ?? 1;
    const moduleNames = Object.keys(operator.modules);
    const defaultModule = moduleNames.at(-1) ?? "none";
    const moduleLevels = Object.keys(operator.modules[defaultModule] ?? {});
    const defaultModuleLevel = moduleLevels.at(-1) ?? 0;

    return `
        <label>
            潜在
            <select class="skadi-potential">
                ${operator.potential.map(potential => `
                    <option
                        value="${potential.id}"
                        ${potential.id === defaultPotential ? "selected" : ""}
                    >
                        潜在${potential.id}：${potential.note}
                    </option>
                `).join("")}
            </select>
        </label>

        <label>
            モジュール
            <select class="skadi-module">
                <option value="none">なし</option>
                ${moduleNames.map(moduleName => `
                    <option
                        value="${moduleName}"
                        ${moduleName === defaultModule ? "selected" : ""}
                    >
                        ${moduleName}
                    </option>
                `).join("")}
            </select>
        </label>

        <label class="skadi-module-level-area">
            モジュールレベル
            <select class="skadi-module-level">
                ${moduleLevels.map(level => `
                    <option
                        value="${level}"
                        ${String(level) === String(defaultModuleLevel)
            ? "selected"
            : ""
        }
                    >
                        Lv${level}
                    </option>
                `).join("")}
            </select>
        </label>

        <fieldset class="skadi-conditions">
            <legend>発動条件</legend>

            <label>
                <input
                    type="checkbox"
                    class="skadi-abyssal-ally"
                >
                味方アビサル
            </label>

            <label class="skadi-two-allies-area">
                <input
                    type="checkbox"
                    class="skadi-two-allies"
                >
                味方2人以上
            </label>
        </fieldset>

        <fieldset class="skadi-self-buffs">
            <legend>バフ</legend>

            ${availableSelfBuffs.map(createSingleBuffItem).join("")}
        </fieldset>
    `;
}

export function initSkadiSettings(
    item,
    operator,
    availableSelfBuffs
) {
    if (!item) return;

    const settings = item.querySelector(".support-operator-settings");

    settings.innerHTML = createSettingsHTML(
        operator,
        availableSelfBuffs
    );
    bindSingleBuffItems(settings);

    const moduleSelect = settings.querySelector(".skadi-module");
    const moduleLevelArea = settings.querySelector(
        ".skadi-module-level-area"
    );
    const twoAlliesArea = settings.querySelector(
        ".skadi-two-allies-area"
    );

    function updateVisibility() {
        moduleLevelArea.hidden = moduleSelect.value === "none";
        twoAlliesArea.hidden = moduleSelect.value !== "X";
    }

    moduleSelect.addEventListener("change", updateVisibility);
    updateVisibility();
}

export function getSkadiSettings() {
    const item = document.querySelector(
        '[data-support-operator-id="skadi_the_corrupting_heart"]'
    );

    if (!item) return { enabled: false };

    return {
        id: item.dataset.supportOperatorId,
        enabled: true,
        potential: Number(item.querySelector(".skadi-potential").value),
        module: item.querySelector(".skadi-module").value,
        moduleLevel: Number(
            item.querySelector(".skadi-module-level").value || 0
        ),
        conditions: {
            abyssalAlly:
                item.querySelector(".skadi-abyssal-ally").checked,
            twoAllies:
                item.querySelector(".skadi-two-allies").checked
        },
        selfBuffs: getSelectedSingleBuffs(
            item.querySelector(".skadi-self-buffs")
        )
    };
}

export function calculateSkadiConditionAtkAdd(settings) {
    let atkAdd = 0;

    // 通常時の+6%はデータ側のtalentsに含まれるため、差分だけ加算する。
    if (settings.conditions?.abyssalAlly) {
        atkAdd += 9;
    }

    if (
        settings.module === "X" &&
        settings.conditions?.twoAllies
    ) {
        atkAdd += 8;
    }

    return atkAdd;
}
