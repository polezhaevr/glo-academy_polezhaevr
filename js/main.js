'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
    income = "СТО",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 500000;
let expenses = [];

let start = function () {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};

start();

console.log(addExpenses.toLowerCase().split(','));

//вызовы функции showTypeOf
const showTypeOf = function (value) {
    let type = typeof (value);
    console.log(type);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//Расходы за месяц вызов getExpensesMonth
const getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        expenses[i] = prompt('Введите обязательную статью расходов');
        sum = prompt('Во сколько это обойдется?');

        if (isNumber(sum)) {
            sum += sum;
        } else {
            do {
                sum = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(sum));
        }
    }

    return sum;
};


let expensesAmount = getExpensesMonth();
console.log("Расходы за месяц " + expensesAmount);

//getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function (inComes, costs) {
    return inComes - costs;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

//  Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
let getTargetMonth = function (intent) {
    if (intent/accumulatedMonth < 0) {
        console.log ("Цель не будет достигнута");
    }else {
        console.log ("Цель будет достигнута " + Math.ceil (intent/accumulatedMonth) + " месяцев");
    }
    return intent / accumulatedMonth;

};

getTargetMonth(mission);


//Бюджет на день (budgetDay)
let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день " + budgetDay);

let getStatusIncome = function () {
    if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода')
    } else if (budgetDay > 600 && budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так')
    }
};

getStatusIncome();