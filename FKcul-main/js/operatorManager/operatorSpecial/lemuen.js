export function updateLemuenOptions(
    area,
    {
        moduleName,
        moduleLevel,
        previousOptions = {}
    }
) {
    const deploymentSeconds = (
        moduleName === "Y" && moduleLevel >= 3
    )
        ? 15
        : 20;

    area.innerHTML = `
        <label>
            <input
                type="checkbox"
                class="lemuen-deployed-20s"
                ${previousOptions.deployed20s ? "checked" : ""}
            >
            配置から${deploymentSeconds}秒経過
        </label>
        <label>
            <input
                type="checkbox"
                class="lemuen-blast-center"
                ${previousOptions.blastCenter ? "checked" : ""}
            >
            爆心地
        </label>
    `;
}

export function getLemuenOptions(card) {
    return {
        deployed20s: card.querySelector(
            ".lemuen-deployed-20s"
        )?.checked ?? false,
        blastCenter: card.querySelector(
            ".lemuen-blast-center"
        )?.checked ?? false
    };
}

export function calculateLemuenEffects({
    moduleName,
    moduleLevel,
    specialOptions
}) {
    if (!specialOptions.deployed20s) {
        return {};
    }

    let atkAdd = 10;

    if (moduleName === "Y" && moduleLevel >= 2) {
        atkAdd = moduleLevel >= 3 ? 18 : 15;
    }

    return { atkAdd };
}

export function getLemuenHitMultiplier(
    hit,
    { specialOptions }
) {
    return specialOptions.blastCenter ? 450 : hit.multiplier;
}
