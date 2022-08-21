import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 0){
      const date = new Date(value);
      let day = date.getDate().toString();
      let month = (date.getMonth() + 1).toString();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return day + '-' + month + '-' + date.getFullYear();
    }
    return '';
  }

}
