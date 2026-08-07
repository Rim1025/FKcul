export function createWindflitOptions() {
    return `
        <label>
            潜在
            <select class="windflit-potential">
                <option value="1">潜在1：強化なし</option>
                <option value="5" selected>潜在5：素質強化</option>
            </select>
        </label>
        <label>
            モジュール
            <select class="windflit-module">
                <option value="none">なし</option>
                <option value="X" selected>X</option>
            </select>
        </label>
        <label class="windflit-module-level-area">
            モジュールレベル
            <select class="windflit-module-level">
                <option value="1">Lv1</option>
                <option value="2">Lv2</option>
                <option value="3" selected>Lv3</option>
            </select>
        </label>
    `;
}

export function bindWindflitOptions(item) {
    const moduleSelect = item.querySelector(".windflit-module");
    const moduleLevelArea = item.querySelector(
        ".windflit-module-level-area"
    );

    function updateVisibility() {
        moduleLevelArea.hidden = moduleSelect.value === "none";
    }

    moduleSelect.addEventListener("change", updateVisibility);
    updateVisibility();
}

export function getWindflitOptions(item) {
    return {
        potential: Number(item.querySelector(".windflit-potential").value),
        module: item.querySelector(".windflit-module").value,
        moduleLevel: Number(
            item.querySelector(".windflit-module-level").value || 0
        )
    };
}

export function calculateWindflitAtkAdd(selected) {
    const moduleValues = {
        1: { base: 30, potential5: 4 },
        2: { base: 36, potential5: 4 },
        3: { base: 40, potential5: 4 }
    };
    const values = selected.module === "X"
        ? moduleValues[selected.moduleLevel] ?? moduleValues[1]
        : moduleValues[1];

    return values.base + (selected.potential >= 5
        ? values.potential5
        : 0);
}
