class Account {
    constructor(number, owner, balance) {
        this.number = number;
        this.owner = owner;
        this.balance = balance;
        this.transactions = [];
    }

    deposit(amount) {
        this.balance += amount;
        this.transactions.push({ amount, type: 'Deposit' });
        return 'Deposit successful';
    }

    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.transactions.push({ amount, type: 'Withdrawal' });
            return 'Withdrawal successful';
        } else {
            return 'Insufficient funds';
        }
    }

    getTransactionHistory() {
        if (this.transactions.length === 0) {
            return 'No transactions yet.';
        } else {
            let history = `Transaction history for account ${this.number}:<br>`;
            this.transactions.forEach((transaction, index) => {
                history += `${index + 1}. ${transaction.type} of $${transaction.amount}<br>`;
            });
            return history;
        }
    }

    getBalance() {
        return `Account ${this.number} balance: $${this.balance}`;
    }
}

class Bank {
    constructor(name) {
        this.name = name;
        this.accounts = [];
    }

    addAccount(account) {
        this.accounts.push(account);
        return 'Account created successfully';
    }

    findAccount(number) {
        return this.accounts.find(account => account.number === number);
    }
}

const bank = new Bank("My Bank");

function handleButtonClick(action) {
    let output = '';
    switch (action) {
        case 'create-account':
            const acc_number = prompt('Enter account number:');
            const acc_owner = prompt('Enter account owner name:');
            const acc_balance = parseFloat(prompt('Enter opening balance:'));
            const account = new Account(acc_number, acc_owner, acc_balance);
            output = bank.addAccount(account);
            break;
        case 'deposit':
            const acc_number_deposit = prompt('Enter account number:');
            const amount_deposit = parseFloat(prompt('Enter amount to deposit:'));
            const account_deposit = bank.findAccount(acc_number_deposit);
            if (account_deposit) {
                output = account_deposit.deposit(amount_deposit);
            } else {
                output = 'Account not found';
            }
            break;
        case 'withdraw':
            const acc_number_withdraw = prompt('Enter account number:');
            const amount_withdraw = parseFloat(prompt('Enter amount to withdraw:'));
            const account_withdraw = bank.findAccount(acc_number_withdraw);
            if (account_withdraw) {
                output = account_withdraw.withdraw(amount_withdraw);
            } else {
                output = 'Account not found';
            }
            break;
        case 'transaction-history':
            const acc_number_history = prompt('Enter account number:');
            const account_history = bank.findAccount(acc_number_history);
            if (account_history) {
                output = account_history.getTransactionHistory();
            } else {
                output = 'Account not found';
            }
            break;
        case 'check-balance':
            const acc_number_balance = prompt('Enter account number:');
            const account_balance = bank.findAccount(acc_number_balance);
            if (account_balance) {
                output = account_balance.getBalance();
            } else {
                output = 'Account not found';
            }
            break;
        case 'exit':
            output = 'Thank you for using the Bank Management System';
            break;
        default:
            output = 'Invalid action';
    }

    document.getElementById('output').innerHTML = output;
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.id.replace('-btn', '');
            handleButtonClick(action);
        });
    });
});
