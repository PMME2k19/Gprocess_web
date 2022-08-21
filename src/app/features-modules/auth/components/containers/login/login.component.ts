import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { UserLogin } from 'src/app/base-models/auth/UserLogin';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  textBottonLogin = 'ENTRAR';
  processandoLogin = false;
  disabled = false;
  bottonBgColor = "#2E3361";
  myToken = "jkdfjkhsdjkfhFDFJSDFJDSFdkjfhkdflsk";
  loginForm: FormGroup = new FormGroup({});
  responseEnum = ResponseEnum.SUCCESS;
  type: string = 'password';

  constructor(
    private router: Router,
    private loginService: AuthService,
    private alertMsgService: AlertMsgService,
    private authDataService: AuthDataService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  toggleTypePassword(){
    if(this.type === 'text') this.type = 'password';
    else this.type = 'text';
  }

  async realizarLogin(){

    if(this.loginForm?.invalid){
      this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Por favor, preencha todos os campos e tente novamente!");
    }else{

      console.log(this.loginForm.get('user')?.value, this.loginForm.get('password')?.value);

      this.processandoLogin = true;
      this.disabled = true;
      this.bottonBgColor = "rgba(55, 60, 118, 0.8)";
      this.textBottonLogin = 'A PROCESSAR...';

      let authData = new UserLogin(this.loginForm.get('user')?.value, this.loginForm.get('password')?.value);
      this.responseEnum = await this.loginService.login(authData);

      console.log('******ResponseEnum - LOGIN******');
      console.log(this.responseEnum);

      if(this.responseEnum == ResponseEnum.SUCCESS){
        console.log('******(Entrando ...)******');
        this.authDataService.setUserDefaultPass(this.loginForm.get('password')?.value);
        this.router.navigate(['']);
      }

      this.processandoLogin = false;
      this.disabled = false;
      this.bottonBgColor = "#373c76";
      this.textBottonLogin = 'ENTRAR';

    }

  }

}
