let operators = [];

const operatorSelect = document.getElementById("operator");
const atkInput = document.getElementById("atk");
const multiplierInput = document.getElementById("multiplier");

const result = document.getElementById("result");
const button = document.getElementById("calcButton");

button.addEventListener("click", calculateDamage);
operatorSelect.addEventListener("change", updateOperator);

init();

async function init() {

    const response = await fetch("data/operators.json");

    operators = await response.json();

    operators.forEach(operator => {

        const option = document.createElement("option");

        option.value = operator.id;
        option.textContent = operator.name;

        operatorSelect.appendChild(option);

    });

    updateOperator();

}

function updateOperator() {

    const selected = operators.find(
        operator => operator.id === operatorSelect.value
    );

    atkInput.value = selected.atk;
    multiplierInput.value = selected.multiplier;

    calculateDamage();

}

function calculateDamage() {

    const atk = Number(atkInput.value);

    const multiplier = Number(multiplierInput.value);

    result.textContent = Math.floor(atk * multiplier);

}
