import { AccountModel } from './account.model';

export class CheckingAccount implements AccountModel {
  balance: number;
  description: string;
  id: number;
  name: string;
  type = 'CHECKING';

  // https://stackoverflow.com/questions/49997765/reactive-forms-correctly-convert-form-value-to-model-object
  constructor(init?: Partial<CheckingAccount>) {
    Object.assign(this, init);
  }
}
