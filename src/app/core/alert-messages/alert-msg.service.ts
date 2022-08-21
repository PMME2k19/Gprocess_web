import { Injectable } from '@angular/core';
import { ResponseEnum } from 'src/app/base-enums/response-enum';

@Injectable({
  providedIn: 'root'
})
export class AlertMsgService {
  displayAlert : string = 'none';
  alertMsg: string = '';
  alertBgColor: string = '';
  alertTextColor: string = '';
  resStatusCode: ResponseEnum = ResponseEnum.DEFAULT;

  /*displayAlert : string = 'inherit';
  alertMsg: string = 'Login Realizado Com Êxito, Seja bem vindo JS';
  alertBgColor: string = 'rgba(220, 38, 38, 1)';
  alertTextColor: string = '#FFF';*/

  constructor() { }

  showAlert(){
    this.displayAlert = 'inherit';
    
    setTimeout(() => {
      this.displayAlert = 'none';
    }, 6000);
  }

  closeAlert(){
    this.displayAlert = 'none';
  }

  setAlertMsgState(textColor : string, bgColor: string, msg: string){
    this.alertBgColor = bgColor;
    this.alertTextColor = textColor;
    this.alertMsg = msg;
    this.showAlert();
  }
  
}
