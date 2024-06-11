#! /usr/bin/env node
import {faker}  from "@faker-js/faker";
import chalk from "chalk";
import inquirer from "inquirer";


class Customer {
    Firstname :string
    Lastname :string
    Age : number
    Gender :string
    Email : string
    MobilePhone : number
    AccountNumber :number

    constructor
    (fName: string, 
        lname :string,
        age :number,
        gen:string,
        email :string,
         mob: number,
         acc :number
        ){
this.Firstname = fName
this.Lastname = lname
this.Age = age
this.Gender = gen
this.Email = email
this.MobilePhone = mob
this.AccountNumber = acc
    }
}
/// interface bank account
interface BankAccount{
AccountNumber :number;

Balance :number;
}
/// class bank
class Bank{
    accounts :BankAccount[] = []
    customers :Customer[] = [];
    constructor(){
        this.accounts = [];
        this.customers = [];
    }
    addCustomer(obj :Customer){
            this.customers.push(obj)
    }

    addAccountNumber(obj: BankAccount ){
            this.accounts.push(obj);
 }
    }

 let myBank = new Bank();

///console.log(myBank);

//// create customer
////let cust = new Customer("sam","amir",40,"female","sas@null.kn", 14141414, 12121212)
////console.log(cust);

for(let i :number =1; i <= 4; i++)
    {
    let fName = faker.person.firstName(`male`)
    let lName = faker.person.lastName()

    let age = Math.floor(Math.random() * (100 - 18 + 1) +
    18)
    let gen = Math.random() < 0.5 ? "male" : "female"
    let email = faker.internet.email()

   ///let mob = Math.floor(Math.random() * ( 666666666 - 100000000 + 1) + 100000000)
    let mob = parseInt( faker.string.numeric(9))

        const cust = new Customer(fName,lName,age,gen,email,mob,1000+i) 
    
    myBank.addCustomer(cust);
    myBank.addAccountNumber({AccountNumber :cust.AccountNumber,Balance:1000 *i})
        /// console.log(cust);
        console.log(myBank);
        }
        ////Bank functionality
        async function BankService(Bank: Bank){
            let service = await inquirer.prompt([{
                type: 'list',
                name: 'option',
                message: 'Select an option',
                choices: [
                    'Deposit',
                    'Withdraw',
                    'Check Balance',
                    'Exit'
                ]
}
]);
/// view balance
if(service.option === "Check Balance"){
    let res = await inquirer.prompt([{
        type: 'input',
        name: 'num',
        message: 'Enter your account number'
        }]);
        let account :any = myBank.accounts.find((acc)=>acc.AccountNumber == res.num)
    
        if(!account){
            console.log(chalk.bold.red("Account not found"));
            process.exit
        }
        if (account){
            let name = myBank.customers.find(
                (item) => item.AccountNumber === account.AccountNumber
            )
            console.log
            (`Dear ${chalk.bold.greenBright(name?.Firstname)} ${chalk.bold.greenBright(name?.Lastname)}`);
        console.log(`Your current balance is $${chalk.bold.bgGreenBright(account.Balance)}`)}
            

       //// console.log(`Your current balance is ${chalk.bold.greenBright(account.Balance)}`)
        ////console.log("Check Balance")
    }
    else if(service.option === "Deposit"){
        let res = await inquirer.prompt([{
            type: 'input',
            name: 'num',
            message: 'Enter your account number'
            }]);
            let amount = await inquirer.prompt([{
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to deposit'
                }]);
                let account :any = myBank.accounts.find((acc)=>acc.AccountNumber == res.num)
                if(!account){
                    console.log(chalk.bold.red("Account not found"));
                    process.exit
                    }
                    if (account){
                        let name = myBank.customers.find(
                            (item) => item.AccountNumber === account.AccountNumber
                            )
                            account.Balance += parseInt(amount.amount)
                            console.log
                            (`Dear ${chalk.bold.greenBright(name?.Firstname)} ${chalk.bold.greenBright(name?.Lastname)}`)
                                console.log(`Your new balance is $${chalk.bold.bgGreenBright(account.Balance)}`
                                );
                                }
                            }
/// cash withdrawal
            else if(service.option === "Withdraw"){
                let res = await inquirer.prompt([{
                    type: 'input',
                    name: 'num',
                    message: 'Enter your account number'
                    }]);
                    let amount = await inquirer.prompt([{
                        type: 'input',
                        name: 'amount',
                        message: 'Enter the amount to withdraw'
                        }]);
                        let account :any = myBank.accounts.find((acc)=>acc.AccountNumber == res.num)
                        if(!account){
                            console.log(chalk.bold.red("Account not found"));
                            process.exit
                            }
                            if (account){
                                let name = myBank.customers.find(
                                    (item) => item.AccountNumber === account.AccountNumber
                                    )
                                    if(account.Balance < parseInt(amount.amount)){
                                        console.log(chalk.bold.red("Insufficient balance"));
                                        }
                                        else{
                                            account.Balance -= parseInt(amount.amount)
                                            console.log
                                            (`Dear ${chalk.bold.greenBright(name?.Firstname)} ${chalk.bold.greenBright(name?.Lastname)}`
                                                );
                                                console.log(`Your new balance is $${chalk.bold.bgGreenBright(account.Balance)}`
                                                );
                                            }
                                        }

;
}}


        BankService(myBank);

