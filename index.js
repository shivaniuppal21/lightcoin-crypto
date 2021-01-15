let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    if (this.transactions.length === 0){
      return 0;
    }
    let balance = 0;
    for (let trans of this.transactions){
       balance += trans.value
    }
    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  
  commit() {
    this.time = new Date();
    // Add the transaction to the account
    if(this.isAllowed()){
      this.account.addTransaction(this);
    }else{
      console.log("invalid transaction")
    }
  }
}

class Deposit extends Transaction {
  isAllowed(){
    return true
    }
  get value(){
    return this.amount
  }
}

class Withdrawal extends Transaction {
  isAllowed(){
    if(this.account.balance < this.amount){
      return false;
    }else{
      return true;
    }
  }
  get value(){
    return (-this.amount)
  }

}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25,myAccount);
t1.commit();
//console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99,myAccount);
t2.commit();
//console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

t3 = new Deposit(120.00,myAccount);
t3.commit();
//console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);

t4 = new Withdrawal(50.25,myAccount);
t4.commit();
console.log('Balance:', myAccount.balance);

