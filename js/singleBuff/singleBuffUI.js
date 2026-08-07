import singleBuffs from "../../data/singleBuffs.js";
import {
    bindSingleBuffSpecialOptions,
    createSingleBuffSpecialOptions,
    getSingleBuffSpecialOptions
} from "./special/index.js";

function createCountHTML(buff) {
    if (!buff.count) return "";

    return `
        <label class="single-buff-count-area">
            ${buff.count.label}
            <select class="single-buff-count">
                ${Array.from(
                    { length: buff.count.max - buff.count.min + 1 },
                    (_, index) => buff.count.min + index
                ).map(count => `
                    <option value="${count}"
                        ${count === buff.count.default ? "selected" : ""}>
                        ${count}
                    </option>
                `).join("")}
            </select>
        </label>
    `;
}

export function createSingleBuffItem(buff) {
    return `
        <div class="single-buff-item" data-single-buff-id="${buff.id}">
            <label>
                <input type="checkbox" class="single-buff" value="${buff.id}">
                ${buff.name}
            </label>
            <div class="single-buff-options" hidden>
                ${createCountHTML(buff)}
                ${createSingleBuffSpecialOptions(buff)}
            </div>
        </div>
    `;
}

export function bindSingleBuffItems(area) {
    area.querySelectorAll(".single-buff-item").forEach(item => {
        const checkbox = item.querySelector(".single-buff");
        const options = item.querySelector(".single-buff-options");
        const buff = singleBuffs.find(
            data => data.id === item.dataset.singleBuffId
        );

        function updateVisibility() {
            options.hidden = !checkbox.checked;
        }

        checkbox.addEventListener("change", updateVisibility);
        if (buff) bindSingleBuffSpecialOptions(buff, item);
        updateVisibility();
    });
}

export function getSelectedSingleBuffs(area) {
    return [...area.querySelectorAll(".single-buff-item")]
        .filter(item => item.querySelector(".single-buff").checked)
        .map(item => {
            const buff = singleBuffs.find(
                data => data.id === item.dataset.singleBuffId
            );

            return {
                id: item.dataset.singleBuffId,
                count: Number(
                    item.querySelector(".single-buff-count")?.value || 1
                ),
                ...(buff
                    ? getSingleBuffSpecialOptions(buff, item)
                    : {}
                )
            };
        });
}
