export function getSelectedOperators() {

    const selectedOperators = [];

    document
        .querySelectorAll(".operator-card")
        .forEach(card => {

            const id =
                card.querySelector(".operator-select").value;

            // オペレーター未選択ならスキップ
            if (id === "") return;

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

                conditions: [
                    ...card.querySelectorAll(".condition:checked")
                ].map(
                    checkbox => checkbox.value
                ),
            });
        });
    return selectedOperators;
}