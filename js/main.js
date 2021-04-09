'use strict'

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};



function startGameBot() {
    let numberRandom = 34;
    let numQuestion = prompt("Угадай число от 1 до 100");
    console.log(numberRandom);

    function gameBot() {
        if (numQuestion === null) {
            alert('Игра окончена!');
            return;
        }

        if (isNumber(numQuestion)) {
            if (numQuestion > numberRandom) {
                alert("Загаданное число меньше");
                startGameBot();
            } else if (numQuestion < numberRandom) {
                alert("Загаданное число больше");
                startGameBot();
            } else if (Number(numQuestion) === numberRandom) {
                alert("Поздравляю, Вы угадали!!!");
            }

        } else {
            alert("Введи число!");
            startGameBot();
        }
        

    };

    gameBot();
};

startGameBot();
console.dir (gameBot);
