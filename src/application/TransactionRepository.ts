import { Transaction } from "../domain/Transaction";

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  get(code: string): Promise<Transaction>;
  findAll(): Promise<Transaction[]>;
}
