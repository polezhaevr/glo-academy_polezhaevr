'use strict';

let money = +prompt('Ваш месячный доход?'),
    income = "СТО",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 500000,
    expensesOne = prompt('Введите обязательную статью расходов'),
    amountOne = +prompt('Во сколько это обойдется?'),
    expensesTwo = prompt('Введите обязательную статью расходов'),
    amountTwo = +prompt('Во сколько это обойдется?');
   
console.log(typeof money + "\n" + typeof income + "\n" + typeof deposit);
console.log(addExpenses.toLowerCase().split(','));


let getExpensesMonth = function (amountOne, amountTwo) {
    return amountOne + amountTwo;
};

let sum = getExpensesMonth(amountOne, amountTwo);
console.log("Расходы за месяц " + sum);

let getAccumulatedMonth = function (money, sum) {
    return money - sum;
};

let accumulatedMonth = getAccumulatedMonth(money, sum);

let getTargetMonth = function (mission) {
    return mission / accumulatedMonth; 
};

let target = getTargetMonth (mission);
console.log("Срок достидения цели "+ Math.ceil(target));


let budgetDay =  accumulatedMonth / 30;

console.log("Бюджет на день " + budgetDay);

let getStatusIncome = function() {
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