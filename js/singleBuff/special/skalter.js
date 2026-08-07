export function createSkalterSettings() {
    return `
        <div class="skalter-settings single-buff-settings">
            <label>
                濁心スカジの潜在
                <select class="skalter-potential">
                    <option value="1">潜在1：強化なし</option>
                    <option value="4">潜在4：攻撃力上昇</option>
                    <option value="5" selected>潜在5：素質強化</option>
                </select>
            </label>

            <label>
                濁心スカジのモジュール
                <select class="skalter-module">
                    <option value="none">なし</option>
                    <option value="X" selected>X</option>
                </select>
            </label>

            <label class="skalter-module-level-area">
                モジュールレベル
                <select class="skalter-module-level">
                    <option value="1">Lv1</option>
                    <option value="2">Lv2</option>
                    <option value="3" selected>Lv3</option>
                </select>
            </label>

            <div>濁心スカジ自身に適用するバフ</div>

            <label>
                <input
                    type="checkbox"
                    class="skalter-warfarin"
                >
                ワルファリン S2（攻撃力+90%）
            </label>
        </div>
    `;
}

export function bindSkalterSettings(area) {
    const moduleSelect = area.querySelector(".skalter-module");
    const moduleLevelArea = area.querySelector(
        ".skalter-module-level-area"
    );

    function updateModuleLevelVisibility() {
        moduleLevelArea.style.display =
            moduleSelect.value === "none"
                ? "none"
                : "";
    }

    moduleSelect.addEventListener(
        "change",
        updateModuleLevelVisibility
    );

    updateModuleLevelVisibility();
}
