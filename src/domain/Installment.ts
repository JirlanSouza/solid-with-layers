import { v4 as uuid } from "uuid";

export class Installment {
  readonly code: string;

  constructor(readonly number: number, readonly amount: number, code?: string) {
    this.code = code || uuid();
  }
}
