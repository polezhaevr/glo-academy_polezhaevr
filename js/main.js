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
    periodAmount = document.querySelector('.period-amount'), 
    resetBtn =  document.getElementById('cancel');


const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.inCome = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposi = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getAccumulatedMonth();
    this.showResults();
    this.checkStart();
    this.banInputs();
}; 

AppData.prototype.reset = function () {
    this.budget = 0; 
    this.budgetDay = 0; 
    this.budgetMonth = 0; 
    this.expensesMonth = 0; 
    this.inCome = {};
    this.incomeMonth = 0; 
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.precentDeposi = 0; 
    this.moneyDeposit = 0;   
    btnPlusOne.style.display = '';
    btnPlusTwo.style.display = '';
    start.style.display = '';
    resetBtn.style.display = ''; 
    btnCalc.disabled = true;
    periodSelect.value = 1; 
    periodAmount.value = document.querySelector('.period-amount').textContent = 1;
    document.querySelectorAll('input[type=text]').forEach(item => {
        item.value = '';
    });
    for (let i = incomeItem.length - 1; i > 0; i--) {
        incomeItem[0].parentNode.removeChild(incomeItem[i]);
        incomeItem.placeholder = ''; 
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
        expensesItems.placeholder = ''; 
    }
};

AppData.prototype.banInputs = function () {
    document.querySelectorAll('input[type=text]').forEach(item => {
        item.disabled = true;
    });
    btnPlusOne.disabled = true;
    btnPlusTwo.disabled = true
};

AppData.prototype.checkStart = function () {
        btnCalc.style.display = 'none';
        resetBtn.style.display = 'initial';  
};

AppData.prototype.showResults = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSaveMoney();
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcSaveMoney();
    });
};

AppData.prototype.addExpensesBlock = function () {
    let clonedExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(clonedExpensesItem, btnPlusTwo);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        btnPlusTwo.style.display = 'none';
    }

};

AppData.prototype.addIncomeBlock = function () {
    let clonedItemIncome = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(clonedItemIncome, btnPlusOne);
    incomeItem = document.querySelectorAll('.income-items');

    if (incomeItem.length === 3) {
        btnPlusOne.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach(item => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    incomeItem.forEach(item => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.inCome[itemIncome] = Number(cashIncome);
        }
    });


    for (let key in this.inCome) {
        this.incomeMonth += +this.inCome[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    })
};

AppData.prototype.getAddIncome = function () {
    incomeIteem.forEach(item => {
        let itemValue = item.value.trim();
        if (item !== '') {
            this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function () {
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};

AppData.prototype.getAccumulatedMonth = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budget / 30;
};

AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 1200) {
        console.log('У вас высокий уровень дохода')
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
        console.log('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
        console.log('Что то пошло не так')
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.precentDeposit = prompt('Какой у вас процент', 10);
        } while (!isNumber(this.precentDeposit));

        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while (!isNumber(this.moneyDeposit));
    }
};

AppData.prototype.calcSaveMoney = function () {
    return this.budgetMonth * periodSelect.value;

};

AppData.prototype.changePeriodSelect = function () {
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.banStart = function () {
    if (!isNumber(salaryAmount.value)) {
        btnCalc.disabled = true;
    } else {
        btnCalc.disabled = false;
    }
};

AppData.prototype.eventsListeners = function () {
    appData.banStart();
    btnCalc.addEventListener('click', appData.start.bind(appData));
    resetBtn.addEventListener('click' , appData.reset.bind(appData));
    btnPlusTwo.addEventListener('click', appData.addExpensesBlock);
    btnPlusOne.addEventListener('click', appData.addIncomeBlock);
    periodSelect.addEventListener('input', appData.changePeriodSelect);
    salaryAmount.addEventListener('input', appData.banStart);
};

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let isString = function (n) {
    return !parseInt(n) || !parseInt(n) && !isNaN(parseFloat(n)) && isFinite(n)
};



const appData = new AppData(); 
console.log(appData);






appData.eventsListeners();

