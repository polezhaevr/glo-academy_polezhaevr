'use strict';

let appData = {
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    inCome: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 500000,
    period: 3,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let sum = 0,
                question = prompt('Введите обязательную статью расходов');
            do {
                sum = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(sum));

            appData.expenses[question] = Number(sum);
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses ) {
            return appData.expensesMonth = appData.expenses[key] + appData.expenses[key],
            console.log('Расходы за месяц: ' + appData.expensesMonth);
        }
    },
    getAccumulatedMonth: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth; 
        appData.budgetDay = money/30;
        return appData.budgetMonth , appData.budgetDay ; 
    },
    getTargetMonth: function () {
        if (appData.mission/ appData.budgetMonth < 0) {
            console.log("Цель не будет достигнута");
        } else {
            console.log("Цель будет достигнута " + Math.ceil(appData.mission / appData.budgetMonth) + " месяцев");
        }
        return appData.mission/ appData.budgetMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода')
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так')
        }
    }
};


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
    };


start();
appData.asking();
appData.budget = Number(money);
appData.getExpensesMonth();
appData.getAccumulatedMonth();
appData.getTargetMonth();
appData.getStatusIncome();

console.log(appData); 

for (let key in appData) {
console.log ("Наша программа включает в себя данные:" + key + " " + appData[key]); 
};