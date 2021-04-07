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
   
console.log(addExpenses.toLowerCase().split(','));

//вызовы функции showTypeOf
const showTypeOf = function() {
    console.log(typeof money + "\n" + typeof income + "\n" + typeof deposit);
};

showTypeOf(); 

//Расходы за месяц вызов getExpensesMonth
const getExpensesMonth = function (sumOne , sumTwo) {
    return sumOne + sumTwo;
};

let sum = getExpensesMonth(amountOne , amountTwo);
console.log("Расходы за месяц " + sum);

//getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function (fullMoney, fullSum) {
    return fullMoney - fullSum;
};

let accumulatedMonth = getAccumulatedMonth(money, sum);

//  Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
let getTargetMonth = function (intent) {
    return intent / accumulatedMonth; 
};

let target = getTargetMonth (mission);
console.log("Срок достидения цели "+ Math.ceil(target));

//Бюджет на день (budgetDay)
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