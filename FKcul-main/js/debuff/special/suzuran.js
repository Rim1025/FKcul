export function createSuzuranOptions() {
    return `
        <label>
            潜在
            <select class="suzuran-potential">
                <option value="1">潜在1：強化なし</option>
                <option value="5" selected>潜在5：素質強化</option>
            </select>
        </label>
        <label>
            モジュール
            <select class="suzuran-module">
                <option value="none">なし</option>
                <option value="Y" selected>Y</option>
            </select>
        </label>
        <label class="suzuran-module-level-area">
            モジュールレベル
            <select class="suzuran-module-level">
                <option value="1">Lv1</option>
                <option value="2">Lv2</option>
                <option value="3" selected>Lv3</option>
            </select>
        </label>
    `;
}

export function bindSuzuranOptions(item) {
    const moduleSelect = item.querySelector(".suzuran-module");
    const moduleLevelArea = item.querySelector(
        ".suzuran-module-level-area"
    );

    function updateVisibility() {
        moduleLevelArea.hidden = moduleSelect.value === "none";
    }

    moduleSelect.addEventListener("change", updateVisibility);
    updateVisibility();
}

export function getSuzuranOptions(item) {
    return {
        potential: Number(item.querySelector(".suzuran-potential").value),
        module: item.querySelector(".suzuran-module").value,
        moduleLevel: Number(
            item.querySelector(".suzuran-module-level").value || 0
        )
    };
}

export function calculateSuzuranFragile(selected) {
    const baseValues = {
        1: 40,
        2: 42,
        3: 44
    };
    const base = selected.module === "Y"
        ? baseValues[selected.moduleLevel] ?? baseValues[1]
        : baseValues[1];

    return base + (selected.potential >= 5 ? 6 : 0);
}
