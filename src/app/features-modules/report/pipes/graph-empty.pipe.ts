import { Pipe, PipeTransform } from '@angular/core';
import { Chart } from '../models/chart.model';

@Pipe({
  name: 'graphEmptyPipe'
})
export class GraphEmptyPipe implements PipeTransform {

  transform(value: Chart[]): Boolean {

    const isEmpty = value.filter(x => x.value != 0);
    
    return isEmpty ? true : false;
  }

}
