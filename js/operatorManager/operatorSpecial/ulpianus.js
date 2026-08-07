export function updateUlpianusOptions(
    area,
    { potential, previousOptions = {} }
) {

    const maxKills =
        potential >= 5
            ? 10
            : 9;

    const selectedKills = Math.min(
        previousOptions.killCount ?? maxKills,
        maxKills
    );

    area.innerHTML = `
        <label>
            撃破数

            <select class="ulpianus-kill-count">

                ${Array
                    .from(
                        { length: maxKills + 1 },
                        (_, i) => `
                            <option
                                value="${i}"
                                ${i === selectedKills
                                    ? "selected"
                                    : ""
                                }
                            >
                                ${i}
                            </option>
                        `
                    )
                    .join("")
                }

            </select>
        </label>
    `;
}

export function getUlpianusOptions(card) {
    return {
        killCount: Number(
            card.querySelector(".ulpianus-kill-count")?.value || 0
        )
    };
}

export function calculateUlpianusEffects({
    potential,
    specialOptions = {}
}) {
    const maxKills = potential >= 5 ? 10 : 9;
    const killCount = Math.min(
        Math.max(Number(specialOptions.killCount) || 0, 0),
        maxKills
    );

    return {
        baseAtkFlat: killCount * 30
    };
}
