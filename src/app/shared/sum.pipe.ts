import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // return sum of specified property if array is defined, otherwise, return 0
    return (items ? items.reduce((a, b) => a + b[attr], 0) : 0);
  }
}
