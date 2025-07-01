import { HasFormatter } from "../interfaces/HasFormatter";

export class Invoice implements HasFormatter {
  constructor(
    public client: string,
    public details: string,
    public amount: number
  ) {}

  format() {
    return `${this.client} owes \$${this.amount} for ${this.details}`;
  }
}
