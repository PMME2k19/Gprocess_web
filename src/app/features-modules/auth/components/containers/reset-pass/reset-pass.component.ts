import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { ResetPassData } from 'src/app/base-models/auth/ResetPassData';
import { UserLogin } from 'src/app/base-models/auth/UserLogin';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  textBottonReset = 'ENVIAR';
  processandoReset = false;
  disabled = false;
  bottonBgColor = "#2E3361";
  myToken = "jkdfjkhsdjkfhFDFJSDFJDSFdkjfhkdflsk";
  resetPassForm: FormGroup = new FormGroup({});
  responseEnum = ResponseEnum.SUCCESS;


  constructor(
    private router: Router,
    private loginService: AuthService,
    private alertMsgService: AlertMsgService
  ) {
    console.log(window.innerWidth);
  }

  ngOnInit(): void {
    this.resetPassForm = new FormGroup({
      email: new FormControl(null, [Validators.required])
    });
  }

  async resetPass(){

    console.log("Reset Password...");

    if(this.resetPassForm?.invalid){
      this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Por favor, preencha todos os campos e tente novamente!");
    }else{

      console.log(this.resetPassForm.get('email')?.value);

      this.processandoReset = true;
      this.disabled = true;
      this.bottonBgColor = "rgba(55, 60, 118, 0.8)";
      this.textBottonReset = 'A PROCESSAR...';
      let authData = new ResetPassData(this.resetPassForm.get('email')?.value, environment.siteUrl + 'autenticacao/actualizar-palavra-passe');
      this.responseEnum = await this.loginService.resetPassword(authData);

      console.log('******ResponseEnum - RESET PASSWORD******');
      console.log(this.responseEnum);

      if(this.responseEnum == ResponseEnum.SUCCESS){
        console.log('******(Request - Reset - Success)******');
        this.alertMsgService.setAlertMsgState("#000", "rgba(110, 231, 183, 0.9)", "Operação realizada com sucesso. Por favor, verifique o seu e-mail.");
      }

      this.processandoReset = false;
      this.disabled = false;
      this.bottonBgColor = "#373c76";
      this.textBottonReset = 'ENVIAR';

    }

  }

}
