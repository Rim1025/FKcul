export function updateFirewatchOptions(
    area,
    {
        moduleName,
        moduleLevel,
        previousOptions = {}
    }
) {
    const targetLabel = (
        moduleName === "Y" && moduleLevel >= 2
    )
        ? "遠距離/攻撃しない敵"
        : "遠距離敵";

    area.innerHTML = `
        <label>
            <input
                type="checkbox"
                class="firewatch-talent-target"
                ${previousOptions.talentTarget ? "checked" : ""}
            >
            ${targetLabel}
        </label>
    `;
}

export function getFirewatchOptions(card) {
    return {
        talentTarget: card.querySelector(
            ".firewatch-talent-target"
        )?.checked ?? false
    };
}

export function calculateFirewatchEffects({
    potential,
    moduleName,
    moduleLevel,
    specialOptions
}) {
    if (!specialOptions.talentTarget) {
        return {};
    }

    let atkMultiplier = 140;

    if (moduleName === "Y" && moduleLevel >= 2) {
        atkMultiplier = moduleLevel >= 3 ? 150 : 145;
    }

    if (potential >= 5) {
        atkMultiplier += 5;
    }

    return { atkMul: atkMultiplier / 100 };
}
