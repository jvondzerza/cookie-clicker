(function() {

    let section = document.getElementById("section");
    let cookie = document.getElementById("cookie");
    let onScreenCount = document.getElementById("on-screen-count");
    let display = document.getElementById("display");
    let cookieText = document.getElementById("click-me");
    let autoClickerCounter = 0;
    let count = 0;
    let counter = 1;
    let intervalOne;
    let intervalTwo;
    let timeout;
    let previousCounterState;

    const buttons = [
        {
            cost: 50,
            multiplier: 2,
            id: "first",
            costIncrease: 50
        },
        {
            cost: 100,
            multiplier: 5,
            id: "second",
            costIncrease: 100
        },
        {
            cost: 500,
            multiplier: 10,
            id: "third",
            costIncrease: 500
        },
        {
            cost: 200,
            multiplier: "1 cookie every 5 seconds",
            id: "auto-clicker",
            costIncrease: 200
        },
        {
            cost: 1000,
            multiplier: 2,
            id: "bonus",
            costIncrease: 2000
        }
    ];

    buttons.forEach(button => {
        let multiplierButton = document.createElement("button");
        multiplierButton.setAttribute("id", button.id);
        multiplierButton.innerHTML = `x${button.multiplier}, ${button.cost} cookies`;
        section.appendChild(multiplierButton);
    })

    let firstMultiplier = document.getElementById("first");
    let secondMultiplier = document.getElementById("second");
    let thirdMultiplier = document.getElementById("third");
    let autoClicker = document.getElementById("auto-clicker")
    autoClicker.innerHTML = `1 cookie every 5 seconds, ${buttons[3].cost} cookies`;
    let bonus = document.getElementById("bonus");
    bonus.innerHTML = `200% Bonus on current number of cookies, ${buttons[4].cost} cookies`;

    firstMultiplier.disabled = true;
    secondMultiplier.disabled = true;
    thirdMultiplier.disabled = true;
    autoClicker.disabled = true;
    bonus.disabled= true;

    function visibility(index, element) {
        (count < buttons[index].cost) ? element.disabled = true : element.disabled = false;
    }

    function checkIfLessThanZero() {
        if (count < 0) {
            count = 0;
        }
    }

    cookie.addEventListener("click", () => {
        count += counter;
        checkIfLessThanZero();
        onScreenCount.innerHTML = count.toString();
        cookieText.style.visibility = "hidden";
        visibility(0, firstMultiplier);
        visibility(1, secondMultiplier);
        visibility(2, thirdMultiplier);
        visibility(3, autoClicker);
        visibility(4, bonus);
        previousCounterState = counter;
    })
    function initiateMultipliers (element, index) {
        element.addEventListener("click", () => {
            counter *= buttons[index].multiplier;
            count -= buttons[index].cost;
            checkIfLessThanZero();
            onScreenCount.innerHTML = count.toString();
            buttons[index].cost += buttons[index].costIncrease;
            element.innerHTML = `${counter} x ${buttons[index].multiplier}, ${buttons[index].cost} cookies`;
            element.disabled = true;
            previousCounterState = counter;
        })
    }

    initiateMultipliers(firstMultiplier, 0);
    initiateMultipliers(secondMultiplier, 1);
    initiateMultipliers(thirdMultiplier, 2);

    autoClicker.addEventListener("click", () => {
        display.style.visibility = "visible";
        count -= buttons[3].cost;
        autoClickerCounter++;
        checkIfLessThanZero();
        onScreenCount.innerHTML = count.toString();
        display.innerHTML = `${autoClickerCounter} cookie(s) being accrued every 5 seconds`;
        clearInterval(intervalOne);
        intervalOne = setInterval(() => {
            count += autoClickerCounter;
            onScreenCount.innerHTML = count.toString();
        }, 5000);
        autoClicker.disabled = true;
    })

    bonus.addEventListener("click", () => {
        count -= buttons[4].cost;
        checkIfLessThanZero();
        onScreenCount.innerHTML = count.toString();
        count *= buttons[4].multiplier;
        counter = count;
        let remainingTime = 29;
        clearInterval(intervalTwo);
        clearTimeout(timeout);
        display.innerHTML = "Bonus activated! 30 seconds remaining.";
        intervalTwo = setInterval(() => {
            display.innerHTML = `Bonus activated! ${remainingTime} seconds remaining.`;
            remainingTime -= 1;
        }, 1000);
        timeout = setTimeout(() => {
            counter = previousCounterState;
            clearInterval(intervalTwo);
            display.style.visibility = "hidden";
        }, 30000);
        bonus.disabled = true;
    })

})();



