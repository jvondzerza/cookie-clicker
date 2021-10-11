let counterButton = document.getElementById("counter-button");
let first = document.getElementById("first");
let label = document.getElementById("label");
let counter = 0;
const buttons = [
    {
        cost: 10,
        multiplier: 2,
        id: "first",
        costIncrease: 5
    },
    {
        cost: 20,
        mutliplier: 5,
        id: "first",
        costIncrease: 10
    }
]

function activateButton (num, button) {
    if (counter > num) {
        button.disabled = false;
    }
}
function costOfPurchase (cost, costIncrease, prop) {
    counter -= prop
    prop += costIncrease;
    return cost;
}

function clickMultiplier (multiplier, num, cost, costIncrease, multiplierValue) {

        label.innerText = counter.toString();
        counterButton.addEventListener("click", function () {
            counter += num;
            label.innerText = counter.toString();
            multiplier.innerText = `${multiplierValue} x ${num}`;
        })
}

function clickButton () {

    first.disabled = true;
    counterButton.addEventListener("click", function () {
        counter++;
        label.innerText = counter.toString();
        activateButton(9, first)
    })
    first.onclick = function() {
        let cost = 10;
        clickMultiplier(first, 1, cost, 5, 2)

    }
}

clickButton();

