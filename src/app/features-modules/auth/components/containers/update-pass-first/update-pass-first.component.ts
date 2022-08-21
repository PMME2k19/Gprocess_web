import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { UpdatePassData } from 'src/app/base-models/auth/UpdatePassData';
import { UpdatePassDataLogged } from 'src/app/base-models/auth/UpdatePassDataLogged';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-update-pass-first',
  templateUrl: './update-pass-first.component.html',
  styleUrls: ['./update-pass-first.component.css']
})
export class UpdatePassFirstComponent implements OnInit {

  textBottonReset = 'ACTUALIZAR';
  processandoReset = false;
  disabled = false;
  disabledEmail = true;
  bottonBgColor = "#2E3361";
  updatePassForm: FormGroup = new FormGroup({});
  responseEnum = ResponseEnum.SUCCESS;
  token: string = '';
  email: string = '';
  type: string = 'password';
  passwordlogin: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: AuthService,
    private alertMsgService: AlertMsgService,
    private authDataService: AuthDataService
  ) {
  }

  ngOnInit(): void {
    this.updatePassForm = new FormGroup({
      //email: new FormControl(this.email, /*[Validators.required]*/),
      newPassword: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  toggleTypePassword(){
    if(this.type === 'text') this.type = 'password';
    else this.type = 'text';
  }

  async resetPass(){

    if(this.updatePassForm?.invalid){

      this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Por favor, preencha todos os campos e tente novamente!");

    }else{

      if(this.updatePassForm.get('newPassword')?.value === this.updatePassForm.get('confirmPassword')?.value){

        let tokenDecoded = this.token;

        this.processandoReset = true;
        this.disabled = true;
        this.bottonBgColor = "rgba(55, 60, 118, 0.8)";
        this.textBottonReset = 'A PROCESSAR...';

        let authData = new UpdatePassDataLogged(this.authDataService.getUserDefaultPass(), this.updatePassForm.get('confirmPassword')?.value);
        console.log("Enviando password nova ...");
        this.responseEnum = await this.loginService.updatePasswordLogged(authData);

        console.log('******ResponseEnum - UPDATE PASSWORD******');
        console.log(this.responseEnum);

        if(this.responseEnum == ResponseEnum.SUCCESS){
          console.log('******(Request - Update - Success)******');
          this.alertMsgService.setAlertMsgState("#000", "rgba(110, 231, 183, 0.9)", "Operação realizada com êxito, efectue o Login.");
          this.authDataService.setIsFirstAcess(false);
          this.router.navigate(['/']);
        }

      }else{

        this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Os campos de Palavra-Passe devem ter o mesmo valor!");

      }

      this.processandoReset = false;
      this.disabled = false;
      this.bottonBgColor = "#373c76";
      this.textBottonReset = 'ENVIAR';

    }

  }

}
