'use strict';

let btnCalc = document.getElementById('start'),
    btnPlusOne = document.getElementsByTagName('button')[0],
    btnPlusTwo = document.getElementsByTagName('button')[1],
    depositCheck = document.getElementById('deposit-check'),
    incomeIteem = document.querySelectorAll('.additional_income-item'),
    resultTotal = document.querySelectorAll('.result-total'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
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
    resetBtn = document.getElementById('cancel'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank');


class AppData {
    constructor() {
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
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
    }

    start() {
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getAccumulatedMonth();
        this.showResults();
        this.checkStart();
        this.banInputs();
        this.checkPercent();
    }

    reset() {
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
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
        btnPlusOne.style.display = '';
        btnPlusTwo.style.display = '';
        btnCalc.style.display = '';
        resetBtn.style.display = '';
        depositBank.style.display = '';
        depositAmount.style.display = '';
        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.style.display = '';
        depositCheck.checked = ""; 
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
        this.startInputs();
    }

    banInputs() {
        document.querySelectorAll('input[type=text]').forEach(item => {
            item.disabled = true;
        });
        btnPlusOne.disabled = true;
        btnPlusTwo.disabled = true
    }

    startInputs() {
        document.querySelectorAll('input[type=text]').forEach(item => {
            item.disabled = false;
        });
        btnPlusOne.disabled = false;
        btnPlusTwo.disabled = false;
    }

    checkStart() {
        btnCalc.style.display = 'none';
        resetBtn.style.display = 'initial';
    }

    showResults() {
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
    }

    addExpensesBlock() {
        const clonedExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(clonedExpensesItem, btnPlusTwo);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            btnPlusTwo.style.display = 'none';
        }

    }

    addIncomeBlock() {
        const clonedItemIncome = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(clonedItemIncome, btnPlusOne);
        incomeItem = document.querySelectorAll('.income-items');

        if (incomeItem.length === 3) {
            btnPlusOne.style.display = 'none';
        }
    }

    getExpenses() {
        expensesItems.forEach(item => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        });
    }

    getIncome() {
        incomeItem.forEach(item => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.inCome[itemIncome] = Number(cashIncome);
            }
        });


        for (let key in this.inCome) {
            this.incomeMonth += +this.inCome[key];
        }
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    }

    getAddIncome() {
        incomeIteem.forEach(item => {
            const itemValue = item.value.trim();
            if (item !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getAccumulatedMonth() {
        const monthDeposit = this.moneyDeposit * (this.precentDeposit / 100);

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = this.budget / 30;
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода')
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else {
            console.log('Что то пошло не так')
        }
    }

    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;

    }

    changePeriodSelect() {
        periodAmount.textContent = periodSelect.value;
    }

    banStart() {
        if (!isNumber(salaryAmount.value)) {
            btnCalc.disabled = true;
        } else {
            btnCalc.disabled = false;
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.precentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
        } else {
            depositPercent.value = valueSelect;
        }
    }

    checkPercent() {
        if (depositCheck.checked) {
            if (isString(depositPercent.value) || (!isNumber(depositPercent.value) || depositPercent.value < 0 || depositPercent.value > 100)) {
                this.reset()
                alert("Введите корректное значение в поле проценты");
            }
        }
    }

    depositHabdler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = '';
            depositAmount.style.display = '';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.style.display = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventsListeners() {
        appData.banStart();
        btnCalc.addEventListener('click', appData.start.bind(appData));
        resetBtn.addEventListener('click', appData.reset.bind(appData));
        btnPlusTwo.addEventListener('click', appData.addExpensesBlock);
        btnPlusOne.addEventListener('click', appData.addIncomeBlock);
        periodSelect.addEventListener('input', appData.changePeriodSelect);
        salaryAmount.addEventListener('input', appData.banStart);
        depositCheck.addEventListener('change', this.depositHabdler.bind(this));
    }
}


let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

let isString = function (n) {
    return !parseInt(n) || !parseInt(n) && !isNaN(parseFloat(n)) && isFinite(n)
}




const appData = new AppData();
console.log(appData);

appData.eventsListeners();