( function () {

    let section = document.getElementById("section")
    let cookie = document.getElementById("cookie");
    let first = document.getElementById("first");
    let label = document.getElementById("label");
    let count = 0;
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
            multiplier: 5,
            id: "second",
            costIncrease: 10
        }
    ];

    /*buttons.forEach(button => () => {
        if (counter < button.cost) {
            document.getElementById(button.id).disabled = true;
        }
    })*/

    first.style.visibility = "hidden";

    cookie.addEventListener("click", () => {
        first.style.visibility = "visible";
        count++;
        counter = count;
        label.innerText = counter.toString();
        if (count < 10) {
            first.disabled = true;
        } else {
            first.disabled = false;
        }
    })

    first.addEventListener("click", () => {
        count *= buttons[0].multiplier;
        counter -= buttons[0].cost;
        count = counter;
        label.innerText = counter.toString();
        buttons[0].cost += buttons[0].costIncrease;
        first.innerText = `x2 Multiplier, Cost: ${buttons[0].cost}`;
        cookie.addEventListener("click", () => {
            if (count < 0) {
                count = 0
            }
            count++;
            counter = count;
            label.innerText = counter.toString();
        })
    })


})();



