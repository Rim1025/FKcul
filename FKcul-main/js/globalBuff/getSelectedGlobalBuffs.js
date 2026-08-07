export function getSelectedGlobalBuffs() {

    const selectedBuffs = [];

    document
        .querySelectorAll(".global-buff-item")
        .forEach(item => {

            const checkbox =
                item.querySelector(
                    ".global-buff-check"
                );

            if (!checkbox.checked) {
                return;
            }


            const potentialSelect =
                item.querySelector(
                    ".global-buff-potential"
                );

            const moduleSelect =
                item.querySelector(
                    ".global-buff-module"
                );

            const moduleLevelSelect =
                item.querySelector(
                    ".global-buff-module-level"
                );


            selectedBuffs.push({

                id: checkbox.value,

                potential: Number(
                    potentialSelect?.value || 1
                ),

                module:
                    moduleSelect?.value || "none",

                moduleLevel: Number(
                    moduleLevelSelect?.value || 0
                )

            });

        });


    return selectedBuffs;
}