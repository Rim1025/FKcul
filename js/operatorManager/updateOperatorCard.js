import {
    getOperatorSpecialConditions
} from "./operatorSpecial/index.js";

export function updateOperator(operatorData) {

    // 現在選択されているID
    const selectedIds = [...document.querySelectorAll(".operator-select")]
        .map(select => select.value)
        .filter(id => id !== "");

    // 全カードを更新
    document.querySelectorAll(".operator-select").forEach(select => {

        const current = select.value;

        select.innerHTML = `
            <option value="">
                オペレーターを選択
            </option>
            ${operatorData.map(op => {

            const disabled =
                selectedIds.includes(op.id) &&
                op.id !== current;

            return `
                    <option
                        value="${op.id}"
                        ${current === op.id ? "selected" : ""}
                        ${disabled ? "disabled" : ""}
                    >
                        ${op.name}${disabled ? "（選択済み）" : ""}
                    </option>
                `;

        }).join("")}
        `;
    });
}

export function updatePotential(operator, potentialSelect) {

    potentialSelect.innerHTML = "";

    if (!operator) {
        potentialSelect.innerHTML += `
            <option value="1">潜在1</option>
        `;
        return;
    }


    const potentialOptions = [
        {
            id: 1,
            note: "強化なし"
        },
        ...operator.potential
    ];

    potentialOptions.forEach(potential => {
        potentialSelect.innerHTML += `
            <option value="${potential.id}">
                潜在${potential.id}：${potential.note || "強化あり"}
            </option>
        `;
    });

    // 計算に関係する最大潜在を選択
    potentialSelect.value = String(
        potentialOptions.at(-1).id
    );

}

export function updateModule(
    operator,
    moduleArea,
    moduleSelect,
    moduleLevelArea,
    moduleLevelSelect
) {

    moduleArea.style.display = "none";
    moduleLevelArea.style.display = "none";

    moduleSelect.innerHTML = `
        <option value="none">なし</option>
    `;

    moduleLevelSelect.innerHTML = "";

    if (!operator) return;

    // モジュールが1つもない
    if (Object.keys(operator.modules).length === 0) {
        return;
    }

    // モジュール欄を表示
    moduleArea.style.display = "";

    Object.keys(operator.modules).forEach(name => {

        moduleSelect.innerHTML += `
        <option value="${name}">
            ${name}
        </option>
    `;
    });


    // 最初のモジュールを自動選択
    const firstModule = Object.keys(operator.modules)[0];

    moduleSelect.value = firstModule;


    // レベル更新（Lv3選択もここで行われる）
    updateModuleLevel(
        operator,
        firstModule,
        moduleLevelArea,
        moduleLevelSelect
    );
}

export function updateModuleLevel(
    operator,
    moduleName,
    moduleLevelArea,
    moduleLevelSelect
) {
    moduleLevelArea.style.display = "none";
    moduleLevelSelect.innerHTML = "";

    if (moduleName === "none") return;

    const module = operator.modules[moduleName];

    if (!module) return;

    Object.keys(module).forEach(level => {

        moduleLevelSelect.innerHTML += `
            <option value="${level}">
                Lv${level}
            </option>
        `;

    });
    moduleLevelSelect.value = "3";

    moduleLevelArea.style.display = "";
}

export function updateConditions(
    operator,
    moduleName,
    moduleLevel,
    area
) {
    area.innerHTML = "";

    if (!operator) return;

    const conditions = [];

    // キャラ固有条件
    conditions.push(
        ...getOperatorSpecialConditions(operator)
    );

    // 素質条件

    operator.talents.forEach(talent => {
        talent.effects.forEach(effect => {
            if (effect.condition) {
                conditions.push(
                    effect.condition.label
                );
            }
        });
    });

    // モジュール条件

    if (
        moduleName !== "none" &&
        operator.modules[moduleName]
    ) {
        const module =
            operator.modules[moduleName];

        const level = operator.modules[moduleName]?.[moduleLevel];

        if (level) {

            level.effects.forEach(effect => {

                if (effect.condition) {

                    conditions.push(
                        effect.condition.label
                    );
                }
            });
        }
    }

    // 重複削除

    const uniqueConditions = [...new Set(conditions)];

    // チェックボックス生成

    uniqueConditions.forEach(condition => {
        area.innerHTML += `
            <label>
                <input
                    type="checkbox"
                    class="condition"
                    value="${condition}"
                    checked
                >
                ${condition}
            </label>
        `;
    });
}
