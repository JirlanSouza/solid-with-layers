import { v4 as uuid } from "uuid";
import { Installment } from "./Installment";

export class Transaction {
  readonly code: string;
  installments: Installment[];

  constructor(
    readonly amount: number,
    readonly numberInstallment: number,
    readonly paymentMethod: string,
    code?: string
  ) {
    this.code = code || uuid();
    this.installments = [];
  }

  generateInstallments() {
    let amount = Math.round(this.amount / this.numberInstallment);
    const amountDiff = this.amount - amount * this.numberInstallment;

    for (let i = 1; i <= this.numberInstallment; i++) {
      if (i === this.numberInstallment) {
        amount += amountDiff;
      }
      const installment = new Installment(i, amount);
      this.installments.push(installment);
    }
  }
}
