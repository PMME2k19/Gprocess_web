import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
  ) { }

  validateDate(date: string): boolean{
    const now = new Date(); // Data de hoje
    const myDate = new Date(date); // Data escolhida pelo utilizador
    const diff = now.getTime() - myDate.getTime(); // Subtrai uma data pela outra

    console.log(diff);

    if(diff < 0) {
      return false;
    } else return true;
  }
}

 