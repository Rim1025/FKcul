import {
    bindSingleBuffItems,
    createSingleBuffItem,
    getSelectedSingleBuffs
} from "../../singleBuff/singleBuffUI.js";

function createSettingsHTML(operator, availableSelfBuffs) {
    const defaultPotential = operator.potential.at(-1)?.id ?? 1;
    const moduleNames = Object.keys(operator.modules ?? {});
    const defaultModule = moduleNames.at(-1) ?? "none";
    const moduleLevels = Object.keys(
        operator.modules?.[defaultModule] ?? {}
    );
    const defaultModuleLevel = moduleLevels.at(-1) ?? 0;

    return `
        <label>
            潜在
            <select class="heidi-potential">
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

        ${moduleNames.length > 0 ? `
            <label>
                モジュール
                <select class="heidi-module">
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

            <label class="heidi-module-level-area">
                モジュールレベル
                <select class="heidi-module-level">
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
        ` : ""}

        <fieldset class="heidi-conditions">
            <legend>発動条件</legend>

            <label class="heidi-two-allies-area">
                <input
                    type="checkbox"
                    class="heidi-two-allies"
                >
                味方2人以上
            </label>
        </fieldset>

        <fieldset class="heidi-self-buffs">
            <legend>バフ</legend>
            ${availableSelfBuffs.map(createSingleBuffItem).join("")}
        </fieldset>
    `;
}

export function initHeidiSettings(
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

    const moduleSelect = settings.querySelector(".heidi-module");
    const moduleLevelArea = settings.querySelector(
        ".heidi-module-level-area"
    );
    const twoAlliesArea = settings.querySelector(
        ".heidi-two-allies-area"
    );

    function updateVisibility() {
        if (moduleLevelArea) {
            moduleLevelArea.hidden = moduleSelect?.value === "none";
        }

        twoAlliesArea.hidden = moduleSelect?.value !== "X";
    }

    moduleSelect?.addEventListener("change", updateVisibility);
    updateVisibility();
}

export function getHeidiSettings() {
    const item = document.querySelector(
        '[data-support-operator-id="heidi"]'
    );

    if (!item) return { id: "heidi", enabled: false };

    return {
        id: item.dataset.supportOperatorId,
        enabled: true,
        potential: Number(item.querySelector(".heidi-potential").value),
        module: item.querySelector(".heidi-module")?.value ?? "none",
        moduleLevel: Number(
            item.querySelector(".heidi-module-level")?.value || 0
        ),
        conditions: {
            twoAllies:
                item.querySelector(".heidi-two-allies").checked
        },
        selfBuffs: getSelectedSingleBuffs(
            item.querySelector(".heidi-self-buffs")
        )
    };
}

export function calculateHeidiConditionAtkAdd(settings) {
    return (
        settings.module === "X" &&
        settings.conditions?.twoAllies
    )
        ? 8
        : 0;
}

export function calculateHeidiTargetAtkAdd(settings) {
    let atkAdd = 5;

    if (settings.module === "X" && settings.moduleLevel >= 2) {
        atkAdd = settings.moduleLevel >= 3 ? 8 : 7;
    }

    return atkAdd + (settings.potential >= 5 ? 1 : 0);
}
