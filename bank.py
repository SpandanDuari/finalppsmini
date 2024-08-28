class Bank:
    def __init__(self, name):
        self.name = name
        self.accounts = []

    def add_account(self, account):
        self.accounts.append(account)

class Account:
    def __init__(self, number, owner, balance):
        self.number = number
        self.owner = owner
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(Transaction(amount, 'Deposit'))

    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            self.transactions.append(Transaction(amount, 'Withdrawal'))
        else:
            print('Insufficient funds')
    def get_transaction_history(self):
        if not self.transactions:
            print("No transactions yet.")
        else:
            print(f"Transaction history for account {self.number}:")
            for index, transaction in enumerate(self.transactions, start=1):
                print(f"{index}. {transaction.type} of ${transaction.amount}")        
    def get_balance(self):
        print(f"Account {self.number} balance: ${self.balance}")
class Transaction:
    def __init__(self, amount, type):
        self.amount = amount
        self.type = type


def main():
    bank_name = 'srm'
    bank = Bank(bank_name)
    while True:
        print('1. Create Account')
        print('2. Deposit')
        print('3. Withdraw')
        print('4. Transactions')
        print('5. Check current balance')
        print('6. Exit')
        choice = int(input('Enter your choice: '))
        if choice == 1:
            acc_number = input('Enter account number: ')
            acc_owner = input('Enter account owner name: ')
            acc_balance = float(input('Enter opening balance: '))
            account = Account(acc_number, acc_owner, acc_balance)
            bank.add_account(account)
            print('Account created successfully')
        elif choice == 2:
            acc_number = input('Enter account number: ')
            amount = float(input('Enter amount to deposit: '))
            account = find_account(bank.accounts, acc_number)
            if account:
                account.deposit(amount)
                print('Deposit successful')
            else:
                print('Account not found')
        elif choice == 3:
            acc_number = input('Enter account number: ')
            amount = float(input('Enter amount to withdraw: '))
            account = find_account(bank.accounts, acc_number)
            if account:
                account.withdraw(amount)
                print('Withdrawal successful')
            else:
                print('Account not found')
        elif choice == 6:
            print('Thank you for using the Bank Management System')
            break
        
        elif choice == 4:
           acc_number = input('Enter account number: ')
           account = find_account(bank.accounts, acc_number)
           if account:
            account.get_transaction_history()
           else:
            print('Account not found') 
        elif choice == 5:
           acc_number = input('Enter account number: ')
           account = find_account(bank.accounts, acc_number)
           if account:
            account.get_balance()
           else:
             print('Account not found')    
        else:
            print('Invalid choice')        

def find_account(accounts, number):
    for account in accounts:
        if account.number == number:
            return account
    return None

if __name__ == '__main__':
    main()