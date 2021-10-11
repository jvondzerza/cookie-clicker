( function () {

    let section = document.getElementById("section");
    let cookie = document.getElementById("cookie");
    let label = document.getElementById("label");
    let timer = document.getElementById("timer");
    let cookieText = document.getElementById("click-me");
    let count = 0;
    let counter = 1;
    let interval;
    let timeout;

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
            cost: 100,
            multiplier: "1 cookie every 5 seconds",
            id: "auto-clicker",
            costIncrease: 100
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

    cookie.addEventListener("click", () => {
        count += counter;
        if (count < 0) {
            count = 0;
        }
        label.innerHTML = count.toString();
        cookieText.style.visibility = "hidden";
        visibility(0, firstMultiplier);
        visibility(1, secondMultiplier);
        visibility(2, thirdMultiplier);
        visibility(3, autoClicker);
        visibility(4, bonus);
    })
    function initiateMultipliers (element, index) {
        if (count < 0) {
            count = 0;
        }
        element.addEventListener("click", () => {
            counter *= buttons[index].multiplier;
            count -= buttons[index].cost;
            if (count < 0) {
                count = 0;
            }
            label.innerHTML = count.toString();
            buttons[index].cost += buttons[index].costIncrease;
            element.innerHTML = `${counter} x ${buttons[index].multiplier}, ${buttons[index].cost} cookies`;
            element.disabled = true;
        })
    }

    initiateMultipliers(firstMultiplier, 0);
    initiateMultipliers(secondMultiplier, 1);
    initiateMultipliers(thirdMultiplier, 2);

    autoClicker.addEventListener("click", () => {
        count -= buttons[3].cost;
        if (count < 0) {
            count = 0;
        }
        timer.innerHTML = "Automatically adds a cookie every 5 seconds";
        clearInterval(interval);
        interval = setInterval(() => {
            cookie.click();
        }, 5000);
        autoClicker.disabled = true;
    })

    bonus.addEventListener("click", () => {
        count *= buttons[4].multiplier;
        count -= buttons[4].cost;
        counter = count;
        if (count < 0) {
            count = 0;
        }
        let remainingTime = 29;
        clearInterval(interval);
        clearTimeout(timeout);
        timer.innerHTML = "Bonus activated! 30 seconds remaining.";
        interval = setInterval(() => {
            timer.innerHTML = `Bonus activated! ${remainingTime} seconds remaining.`;
            remainingTime -= 1;
        }, 1000);
        timeout = setTimeout(() => {
            counter /= 2;
            clearInterval(interval);
            timer.visibility = "hidden";
        }, 30000);
        bonus.disabled = true;
    })

})();



