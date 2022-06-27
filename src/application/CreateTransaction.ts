import { Transaction } from "../domain/Transaction";
import { TransactionRepository } from "./TransactionRepository";

export class CreateTransaction {
  constructor(private repository: TransactionRepository) {}

  async perform(input: CreateTransactionInput): Promise<void> {
    const transaction = new Transaction(
      input.amount,
      input.numberInstallment,
      input.paymentMethod
    );

    transaction.generateInstallments();
    this.repository.save(transaction);
  }
}

type CreateTransactionInput = {
  amount: number;
  numberInstallment: number;
  paymentMethod: string;
};
