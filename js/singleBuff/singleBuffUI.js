import {
    bindSkalterSettings,
    createSkalterSettings
} from "./special/skalter.js";

const specialSettings = {
    skalter: {
        create: createSkalterSettings,
        bind: bindSkalterSettings
    }
};

export function createSingleBuffItem(buff) {
    const special = specialSettings[buff.special];

    return `
        <div class="single-buff-item" data-single-buff-id="${buff.id}">
            <label>
                <input
                    type="checkbox"
                    class="single-buff"
                    value="${buff.id}"
                >
                ${buff.name}
            </label>
            ${special ? special.create() : ""}
        </div>
    `;
}

export function bindSingleBuffItems(area, singleBuffs) {
    singleBuffs.forEach(buff => {
        const item = area.querySelector(
            `[data-single-buff-id="${buff.id}"]`
        );
        const checkbox = item.querySelector(".single-buff");
        const settingsArea = item.querySelector(
            ".single-buff-settings"
        );

        if (!settingsArea) return;

        const special = specialSettings[buff.special];

        settingsArea.style.display = "none";
        special.bind(settingsArea);

        checkbox.addEventListener("change", () => {
            settingsArea.style.display = checkbox.checked
                ? ""
                : "none";
        });
    });
}
