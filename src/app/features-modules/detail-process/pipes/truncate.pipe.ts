import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    
    if(value == '' || value == null){
        return '-----';
    }

    return value.length < limit
      ? value
      : value.slice(0, limit) + '...';
  }
}