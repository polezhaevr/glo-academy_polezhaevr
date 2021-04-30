'use strict';
let btnCalc = document.getElementById('start'),
    btnPlusOne = document.getElementsByTagName('button')[0],
    btnPlusTwo = document.getElementsByTagName('button')[1],
    inpCheck = document.querySelector('#deposit-check'),
    incomeIteem = document.querySelectorAll('.additional_income-item'),
    resultTotal = document.querySelectorAll('.result-total'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    inCome: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    precentDeposi: 0,
    moneyDeposit: 0,
    start: function () {
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getAccumulatedMonth();
        appData.showResults();

    },
    showResults: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSaveMoney();
        periodSelect.addEventListener('input' , () => {
            incomePeriodValue.value = appData.calcSaveMoney();
        });
    },
    addExpensesBlock: function () {
        let clonedExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(clonedExpensesItem, btnPlusTwo);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            btnPlusTwo.style.display = 'none';
        }

    },
    addIncomeBlock: function () {
        let clonedItemIncome = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(clonedItemIncome , btnPlusOne);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            btnPlusOne.style.display = 'none'; 
        }
     },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = Number(cashExpenses);
            }
        });
    },
    getIncome: function () {
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value; 
            if (itemIncome !== '' && cashIncome !== ''){
                appData.inCome[itemIncome] = Number(cashIncome);
            }
        });


        for (let key in appData.inCome) {
            appData.incomeMonth += +appData.inCome[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function () {
        incomeIteem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (item !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            return appData.expensesMonth = appData.expenses[key] + appData.expenses[key],
                console.log('Расходы за месяц: ' + appData.expensesMonth);
        }
    },
    getAccumulatedMonth: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budget / 30;
        return appData.budgetMonth, appData.budgetDay;
    },
    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
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
        return appData.budgetMonth * periodSelect.value;

    }, 
    changePeriodSelect: function() {
        periodAmount.textContent = periodSelect.value;
   },
   banStart: function() {
     if (!isNumber(salaryAmount.value)) {
        btnCalc.disabled = true;
     }else {
        btnCalc.disabled = false; 
     }
   }
};

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let isString = function (n) {
    return !parseInt(n) || !parseInt(n) && !isNaN(parseFloat(n)) && isFinite(n)
};

appData.banStart();
btnCalc.addEventListener('click', appData.start);
btnPlusTwo.addEventListener('click', appData.addExpensesBlock);
btnPlusOne.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.banStart);



