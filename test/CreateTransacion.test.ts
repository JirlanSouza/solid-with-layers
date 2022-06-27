import { CreateTransaction } from "../src/application/CreateTransaction";
import { TransactionInMemoryRepository } from "../src/infra/database/TransactionInMemoryRepository";
import { TransactionRepository } from "../src/application/TransactionRepository";

describe("create a transaction", () => {
  let transactionRepository: TransactionRepository;
  let createTransaction: CreateTransaction;

  beforeEach(() => {
    transactionRepository = new TransactionInMemoryRepository();
    createTransaction = new CreateTransaction(transactionRepository);
  });

  test("Have create a new transaction", async () => {
    const createTransactionInput = {
      amount: 1000,
      numberInstallment: 12,
      paymentMethod: "Credit card",
    };

    createTransaction.perform(createTransactionInput);
    const transactions = await transactionRepository.findAll();

    expect(transactions).toHaveLength(1);
    expect(transactions[0].amount).toBe(createTransactionInput.amount);
    expect(transactions[0].numberInstallment).toBe(
      createTransactionInput.numberInstallment
    );
    expect(transactions[0].paymentMethod).toBe(
      createTransactionInput.paymentMethod
    );
    expect(transactions[0].installments).toHaveLength(
      createTransactionInput.numberInstallment
    );
  });

  test("Have installment amount rounded values", async () => {
    const createTransactionInput = {
      amount: 1000,
      numberInstallment: 12,
      paymentMethod: "Credit card",
    };

    createTransaction.perform(createTransactionInput);
    const transactions = await transactionRepository.findAll();
    const firstInstallmentAmount = transactions[0].installments[0].amount;

    expect(firstInstallmentAmount).toBe(Math.round(firstInstallmentAmount));
  });

  test("The sum all installments amount have to be equals the transaction amount", async () => {
    const createTransactionInput = {
      amount: 1002.99,
      numberInstallment: 12,
      paymentMethod: "Credit card",
    };

    createTransaction.perform(createTransactionInput);
    const [transaction] = await transactionRepository.findAll();
    const installmentsSummedAmounts = transaction.installments.reduce(
      (acc, installment) => {
        return (acc += installment.amount);
      },
      0
    );

    console.log(
      transaction.installments[0],
      transaction.installments[11],
      installmentsSummedAmounts
    );

    expect(installmentsSummedAmounts).toBe(createTransactionInput.amount);
  });
});
