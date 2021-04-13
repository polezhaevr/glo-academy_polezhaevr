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
    precentDeposi: 0,
    moneyDeposit: 0,
    mission: 500000,
    period: 3,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка')) {
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('Какой у вас лополнительный заработок', 'Делаю пиццу');
            } while (!isString(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 10000);
            } while (!isNumber(cashIncome));

            appData.inCome[itemIncome] = cashIncome;
        }
        let addExpenses;

        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'штаны , обувь , лекарства');
        } while (!isString(addExpenses));
        appData.addExpenses = addExpenses.split(',');
        let str = '';
        for (let arrExpenses of appData.addExpenses) {
            arrExpenses = arrExpenses.trim();
            arrExpenses = arrExpenses[0].toUpperCase() + arrExpenses.slice(1) + ", ";
            str += arrExpenses;


        };
        console.log(str.substring(0 ,str.length-2));
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let sum = 0,
                question = 0;
            do {
                question = prompt('Введите обязательную статью расходов', 'еда');
            } while (!isString(question));

            do {
                sum = prompt('Во сколько это обойдется?', 1000);
            }
            while (!isNumber(sum));

            appData.expenses[question] = Number(sum);
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            return appData.expensesMonth = appData.expenses[key] + appData.expenses[key],
                console.log('Расходы за месяц: ' + appData.expensesMonth);
        }
    },
    getAccumulatedMonth: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = money / 30;
        return appData.budgetMonth, appData.budgetDay;
    },
    getTargetMonth: function () {
        if (appData.mission / appData.budgetMonth < 0) {
            console.log("Цель не будет достигнута");
        } else {
            console.log("Цель будет достигнута " + Math.ceil(appData.mission / appData.budgetMonth) + " месяцев");
        }
        return appData.mission / appData.budgetMonth;
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
    },

    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.precentDeposit = prompt('Какой у вас процент', 10);
            } while (!isNumber(appData.precentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(appData.moneyDeposit));
        }
    },

    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;

    }
};


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let isString = function (n) {
    return !parseInt(n) || !parseInt(n) && !isNaN(parseFloat(n)) && isFinite(n)
};


let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?', 100000);
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
appData.getInfoDeposit();

console.log(appData);

let btnCalc = document.getElementById('start'), 
    btnPlusOne = document.getElementsByTagName('button')[0],
    btnPlusTwo = document.getElementsByTagName('button')[1],
    inpCheck = document.querySelector('#deposit-check'), 
    incomeIteem = document.querySelectorAll('.additional_income-item'), 
    resultTotal = document.querySelectorAll('.result-total'), 
    salaryAmount = document.querySelectorAll('.salary-amount'), 
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'), 
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), 
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'), 
    periodSelect = document.querySelector('.period-select');





console.log(btnCalc);
console.log(btnPlusOne); 
console.log(btnPlusTwo); 
console.log(inpCheck);
console.log(incomeIteem); 
console.log(resultTotal);
console.log(salaryAmount); 
console.log(incomeTitle);
console.log(incomeAmount);
console.log(additionalIncomeItem);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(depositAmount );
console.log(depositPercent);
console.log(targetAmount);
console.log(periodSelect);
