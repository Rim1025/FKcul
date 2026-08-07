import {
    calculateLogosS1ExecuteDamage
} from "./logos.js";

export function calculateSpecialHitDamage(special, hitDamage) {
    switch (special) {
        case "logos_s1_execute":
            return calculateLogosS1ExecuteDamage(hitDamage);

        default:
            return null;
    }
}
