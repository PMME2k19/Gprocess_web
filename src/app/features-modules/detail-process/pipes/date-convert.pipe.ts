import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateConvertPipe'
})
export class DateConvertPipe implements PipeTransform {

  transform(value: string): string {

    const dateArray = value.split('/');

    return dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
  }

}
