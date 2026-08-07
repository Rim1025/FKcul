import {
    getOperatorSpecialOptions
} from "./operatorSpecial/index.js";

export function getSelectedOperators() {

    const selectedOperators = [];

    document
        .querySelectorAll(".operator-card")
        .forEach(card => {

            const id =
                card.querySelector(".operator-select").value;

            // オペレーター未選択ならスキップ
            if (id === "") return;

            const operator = { id };

            selectedOperators.push({

                id: id,

                potential: Number(
                    card.querySelector(".potential").value
                ),

                module:
                    card.querySelector(".module").value,

                moduleLevel: Number(
                    card.querySelector(".module-level").value || 0
                ),

                hitCount: Number(
                    card.querySelector(".hit-count")?.value || 1
                ),

                conditions: [
                    ...card.querySelectorAll(".condition:checked")
                ].map(
                    checkbox => checkbox.value
                ),

                specialOptions:
                    getOperatorSpecialOptions(operator, card),

                singleBuffs: [
                    ...card.querySelectorAll(".single-buff:checked")
                ].map(checkbox => checkbox.value)

            });
        });
    return selectedOperators;
}
