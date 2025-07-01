import { HasFormatter } from "../interfaces/HasFormatter";

export class payment implements HasFormatter {
  constructor(
    public recepient: string,
    public details: string,
    public amount: number
  ) {}

  format() {
    return `${this.recepient} owes \$${this.amount} for ${this.details}`;
  }
}
