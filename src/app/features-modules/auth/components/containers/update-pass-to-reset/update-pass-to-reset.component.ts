import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { UpdatePassData } from 'src/app/base-models/auth/UpdatePassData';
import jwt_decode from 'jwt-decode';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-update-pass-to-reset',
  templateUrl: './update-pass-to-reset.component.html',
  styleUrls: ['./update-pass-to-reset.component.css']
})
export class UpdatePassToResetComponent implements OnInit {

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: AuthService,
    private alertMsgService: AlertMsgService,
    private authDataService: AuthDataService
  ) {
    this.route.queryParams
      .subscribe(tokenParam => {
        this.token = tokenParam['token'];
        this.email = tokenParam['email'];
      }
    );
  }

  ngOnInit(): void {
    this.updatePassForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required]),
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

        let tokenDecoded = atob(this.token);

        this.processandoReset = true;
        this.disabled = true;
        this.bottonBgColor = "rgba(55, 60, 118, 0.8)";
        this.textBottonReset = 'A PROCESSAR...';

        let authData = new UpdatePassData(tokenDecoded, this.email, this.updatePassForm.get('confirmPassword')?.value);
        this.responseEnum = await this.loginService.updatePassword(authData);

        console.log('******ResponseEnum - UPDATE PASSWORD******');
        console.log(this.responseEnum);

        if(this.responseEnum == ResponseEnum.SUCCESS){
          console.log('******(Request - Update - Success)******');
          this.alertMsgService.setAlertMsgState("#000", "rgba(110, 231, 183, 0.9)", "Operação realizada com êxito, efectue o Login.");
          this.router.navigate(['autenticacao/login']);
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
