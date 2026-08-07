export function updateBlazeOptions(
    area,
    {
        moduleName,
        moduleLevel,
        previousOptions = {}
    }
) {
    const autoDeploy = previousOptions.autoDeploy ?? true;
    const deployed30Seconds =
        previousOptions.deployed30Seconds ?? true;
    const hpAbove50 = previousOptions.hpAbove50 ?? true;

    area.innerHTML = `
        <label>
            <input
                type="checkbox"
                class="blaze-auto-deploy"
                ${autoDeploy ? "checked" : ""}
            >
            自動指揮
        </label>

        ${moduleName === "X" && moduleLevel >= 2 ? `
            <label>
                <input
                    type="checkbox"
                    class="blaze-deployed-30-seconds"
                    ${deployed30Seconds ? "checked" : ""}
                >
                配置30秒後
            </label>
        ` : ""}

        ${moduleName === "Y" && moduleLevel >= 2 ? `
            <label>
                <input
                    type="checkbox"
                    class="blaze-hp-above-50"
                    ${hpAbove50 ? "checked" : ""}
                >
                HP50%以上
            </label>
        ` : ""}
    `;
}

export function getBlazeOptions(card) {
    return {
        autoDeploy:
            card.querySelector(".blaze-auto-deploy")?.checked
            ?? true,
        deployed30Seconds:
            card.querySelector(".blaze-deployed-30-seconds")?.checked
            ?? true,
        hpAbove50:
            card.querySelector(".blaze-hp-above-50")?.checked
            ?? true
    };
}

export function calculateBlazeEffects({
    moduleName,
    moduleLevel,
    specialOptions = {}
}) {
    let atkAdd = 0;

    if (
        moduleName === "X" &&
        moduleLevel >= 2 &&
        specialOptions.deployed30Seconds
    ) {
        atkAdd += moduleLevel >= 3 ? 6 : 4;
    }

    return {
        skillAtkAdd: specialOptions.autoDeploy
            ? 71.2
            : 80,
        atkAdd
    };
}

export function getBlazeIgnoreDef({
    moduleName,
    moduleLevel,
    specialOptions = {}
}) {
    return (
        moduleName === "Y" &&
        moduleLevel >= 2 &&
        specialOptions.hpAbove50
    )
        ? 150
        : 0;
}
