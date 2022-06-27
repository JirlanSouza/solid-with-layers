import { Transaction } from "../../domain/Transaction";
import { TransactionRepository } from "../../application/TransactionRepository";

export class TransactionInMemoryRepository implements TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  async save(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async get(code: string): Promise<Transaction> {
    const transaction = this.transactions.find(
      (transactionItem) => transactionItem.code === code
    );

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }
}
