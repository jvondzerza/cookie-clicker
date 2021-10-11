( function () {

    let section = document.getElementById("section");
    let cookie = document.getElementById("cookie");
    let label = document.getElementById("label");
    let count = 0

    const player =  {
        multiplier: 1,
        score: 0
    }

    const buttons = [
        {
            cost: 10,
            multiplier: 2,
            id: "first",
            costIncrease: 5
        },
        {
            cost: 20,
            multiplier: 5,
            id: "second",
            costIncrease: 10
        },
        {
            cost: 50,
            multiplier: 10,
            id: "third",
            costIncrease: 20
        }
    ];

    buttons.forEach(button => {
        let multiplierButton = document.createElement("button");
        multiplierButton.setAttribute("id", button.id);
        multiplierButton.innerText = `x${button.multiplier} Multiplier, Cost: ${button.cost}`;
        section.appendChild(multiplierButton);
    })

    let first = document.getElementById("first");
    let second = document.getElementById("second");
    let third = document.getElementById("third");


    cookie.addEventListener("click", () => {
        if (player.score < 0) {
            player.score = 0;
        }
        count += player.multiplier;
        player.score = count;
        label.innerText = player.score.toString();
    })

    first.addEventListener("click", () => {
        player.multiplier *= buttons[0].multiplier;
        player.score -= buttons[0].cost;
        label.innerText = player.score.toString();
        buttons[0].cost += buttons[0].costIncrease;
        first.innerText = `x2 Multiplier, Cost: ${buttons[0].cost}`;
    })

})();



