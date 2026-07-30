const atkInput = document.getElementById("atk");
const multiplierInput = document.getElementById("multiplier");
const result = document.getElementById("result");

const button = document.getElementById("calcButton");

button.addEventListener("click", calculateDamage);

calculateDamage();

function calculateDamage(){

    const atk = Number(atkInput.value);

    const multiplier = Number(multiplierInput.value);

    const damage = atk * multiplier;

    result.textContent = Math.floor(damage);
}
