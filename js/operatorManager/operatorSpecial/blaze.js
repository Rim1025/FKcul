const AUTO_DEPLOY_CONDITION = "自動指揮";

export function getBlazeConditions() {
    return [AUTO_DEPLOY_CONDITION];
}

export function calculateBlazeEffects({ conditions }) {
    return {
        skillAtkAdd: conditions.includes(AUTO_DEPLOY_CONDITION)
            ? 71.2
            : 80
    };
}
