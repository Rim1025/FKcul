function formatNumber(value) {
    return new Intl.NumberFormat("ja-JP", {
        maximumFractionDigits: 2
    }).format(value);
}

function createAttackDetailsHTML(details, inspirationValue) {
    if (!details) return "";

    return `
        <div class="calculation-details">
            <div>数値加算後攻撃力：${formatNumber(details.flatAtk)}</div>
            <div>割合加算：${formatNumber(details.atkAdd)}%</div>
            <div>最終攻撃力：${formatNumber(details.finalAtk)}</div>
            ${inspirationValue === undefined ? "" : `
                <div>鼓舞値：${formatNumber(inspirationValue)}</div>
            `}
        </div>
    `;
}

function renderOperatorDetails(operatorResults) {
    document.querySelectorAll(".operator-card").forEach(card => {
        const id = card.querySelector(".operator-select").value;
        const result = operatorResults.find(item => item.id === id);
        card.querySelector(".operator-calculation-details").innerHTML =
            result
                ? createAttackDetailsHTML(result.attackDetails)
                : "";
    });
}

function renderInspirationDetails(inspirationResults) {
    document.querySelectorAll(".support-operator-item").forEach(item => {
        const sourceId = item.dataset.supportOperatorId;
        const result = inspirationResults.find(
            inspiration => inspiration.sourceId === sourceId
        );
        item.querySelector(".support-calculation-details").innerHTML =
            result
                ? createAttackDetailsHTML(
                    result.attackDetails,
                    result.value
                )
                : "";
    });
}

function renderFinalEnemy(finalEnemy) {
    document.getElementById("final-enemy-status").innerHTML = `
        <h3>最終敵ステータス</h3>
        <div>HP：${formatNumber(finalEnemy.hp)}</div>
        <div>防御力：${formatNumber(finalEnemy.def)}</div>
        <div>術耐性：${formatNumber(finalEnemy.res)}</div>
    `;
}

function renderDamageResult(calculation) {
    const remainHp = calculation.finalEnemy.hp - calculation.totalDamage;
    const breakdown = calculation.operatorResults.map(result => `
        <li>${result.name}：${formatNumber(result.damage)}</li>
    `).join("");

    document.getElementById("result").innerHTML = `
        <h3>総ダメージ：${Math.floor(calculation.totalDamage)}</h3>
        <ul class="damage-breakdown">${breakdown}</ul>
        <p>
            ${remainHp <= 0
                ? "✅ 撃破可能"
                : `❌ 撃破不可<br>残りHP：${Math.ceil(remainHp)}`
            }
        </p>
    `;
}

export function renderCalculationResults(calculation) {
    renderOperatorDetails(calculation.operatorResults);
    renderInspirationDetails(calculation.inspirationResults);
    renderFinalEnemy(calculation.finalEnemy);
    renderDamageResult(calculation);
}
