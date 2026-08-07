export function canApplySingleBuff(buff, operator) {
    if (!buff.targetTag) return true;
    if (!operator) return false;

    const targetTags = Array.isArray(buff.targetTag)
        ? buff.targetTag
        : [buff.targetTag];

    return targetTags.some(tag => operator.tags?.includes(tag));
}
