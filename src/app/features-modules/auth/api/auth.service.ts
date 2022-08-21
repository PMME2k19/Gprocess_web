import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserLogin } from 'src/app/base-models/auth/UserLogin';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { AlertMsgService } from 'src/app/core/alert-messages/alert-msg.service';
import { RefreshData } from 'src/app/base-models/auth/RefreshData';
import jwt_decode from 'jwt-decode';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { User } from 'src/app/base-models/user/User';
import { ResetPassData } from 'src/app/base-models/auth/ResetPassData';
import { UpdatePassData } from 'src/app/base-models/auth/UpdatePassData';
import { UpdatePassDataLogged } from 'src/app/base-models/auth/UpdatePassDataLogged';
import { HomeService } from 'src/app/layouts/home/home.service';

@Injectable()
export class AuthService {

  responseEnum: ResponseEnum = ResponseEnum.SUCCESS;

  constructor(
    private http : HttpClient,
    private alertMsgService: AlertMsgService,
    private authDataService: AuthDataService,
    private homeService: HomeService,
  ) { }

  async login(authData: UserLogin) : Promise<ResponseEnum> {

    let res = await this.http.post<any>(`${environment.apiURL}Auth/login`, authData)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('login', []))
    ).toPromise();

    console.log('*********RES2 - CONTENT*********');
    console.log(res);

    console.log('*********RES3 - STATUS_CODE*********');
    console.log(this.responseEnum);

    return this.responseEnum;

  }

  async resetPassword(resetPassData: ResetPassData) : Promise<ResponseEnum> {

    let res = await this.http.post<any>(`${environment.apiURL}Auth/recovery-password`, resetPassData)
    .pipe(
      tap(_ => {
        this.responseEnum = ResponseEnum.SUCCESS;
      }),
      catchError(this.handleError<any>('recovery-password', []))
    ).toPromise();

    console.log('*********RES2 - CONTENT*********');
    console.log(res);

    console.log('*********RES3 - STATUS_CODE*********');
    console.log(this.responseEnum);

    return this.responseEnum;

  }

  async updatePassword(updatePassData: UpdatePassData) : Promise<ResponseEnum> {

    let res = await this.http.post<any>(`${environment.apiURL}Auth/recovery-password-newpassword`, updatePassData)
    .pipe(
      tap(_ => {
        this.responseEnum = ResponseEnum.SUCCESS;
      }),
      catchError(this.handleError<any>('recovery-password-newpassword', []))
    ).toPromise();

    console.log('*********RES2 - CONTENT*********');
    console.log(res);

    console.log('*********RES3 - STATUS_CODE*********');
    console.log(this.responseEnum);

    return this.responseEnum;

  }

  async updatePasswordLogged(updatePassData: UpdatePassDataLogged) : Promise<ResponseEnum> {
   //Reutilizar (isolar em um método separado)
   var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

   const httpOptions = {
     headers: headers_object
   };

    let res = await this.http.post<any>(`${environment.apiURL}Auth/changepassword`, updatePassData, httpOptions)
    .pipe(
      tap(_ => {
        this.responseEnum = ResponseEnum.SUCCESS;
      }),
      catchError(this.handleError<any>('update-password-newpassword', []))
    ).toPromise();

    console.log('*********RES2 - CONTENT*********');
    console.log(res);

    console.log('*********RES3 - STATUS_CODE*********');
    console.log(this.responseEnum);

    return this.responseEnum;

  }

  handleResult(resultData: any){

    console.log("***********RES AUTH***********");
    console.log(resultData.data.accessToken.token);
    console.log(jwt_decode(resultData.data.accessToken.token));
    console.log("******************************");

    let authData: any = jwt_decode(resultData.data.accessToken.token);

    let userData: User = new User(authData.Nome,
                                  authData.Email,
                                  authData.Perfil,
                                  resultData.data.accessToken.token,
                                  resultData.data.refreshToken,
                                  authData.Id,
                                  resultData.data.isFirstAcess);

    console.log("***********RES AUTH - Result User Data***********");
    console.log(userData);
    console.log("******************************");

    this.authDataService.setUserName(userData.Nome);
    this.authDataService.setUserEmail(userData.Email);
    this.authDataService.setUserProfile(userData.Perfil);
    this.authDataService.setUserToken(userData.Token);
    this.authDataService.setUserRefreshToken(userData.RefreshTken);
    this.authDataService.setIsFirstAcess(userData.IsFirstAcess);
    this.authDataService.setUserId(userData.id);
    this.responseEnum = ResponseEnum.SUCCESS;
    let names = `${userData.Nome}`.split(' ');
    let firstNameLastName = names[0] + " " + names[names.length - 1];
    let msg = firstNameLastName + ' seja bem vindo ao GProcess';
    this.alertMsgService.setAlertMsgState("#000", "rgba(110, 231, 183, 0.9)", msg);
    console.log('*********HandledResult*********');
    console.log(resultData);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.responseEnum = error.status;

      console.log(error);

      switch(this.responseEnum){
        case 0:
          this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Houve um erro inesperado, por favor tente novamente!");
          //alert(`${operation} failed msg 400: ${error.error.Message}`);
          break;
        case 400:
          //alert(`${operation} failed msg 1: ${error.error.Message}`);
          this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Username/Palavra-passe invalido!");
          break;
        case 401:
          this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Não autorizado, token inálido!");
          this.homeService.logOut();
          //alert(`${operation} failed msg 1: ${error.error.Message}`);this.myResponseData.responseMsg = "Não autorizado, token inálido!";
          break;
        case 500:
          //alert(`${operation} failed msg 1: ${error.error.Message}`);
          this.alertMsgService.setAlertMsgState("#FFF", "rgba(220, 38, 38, 1)", "Ocorreu um erro ao realizar o Login. Verifique sua conexão a rede, ou tente mais tarde.");
          break;
        default:
          this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", "Houve um erro inesperado, porfavor tente novamente!");
      }

      console.log('*********HandleError*********');

      //try {
        // TODO: send the error to remote logging infrastructure
        //console.error(JSON.stringify(error.error)); // log to console instead

        // TODO: better job of transforming error for user consumption
        //console.log(`${operation} failed msg 1: ${error.error.success}`);
        //console.log(`${operation} failed msg 2: ${error.error.errors[0]}`);

        // Let the app keep running by returning an empty result.
      //}catch(error){
        //this.alertMsgService.setAlertMsgState("#111", "rgba(255, 153, 51, 1)", 'Houve um erro inesperado, porfavor tente novamente (ou contacte o administrador)!');
        //console.log("Erro inesperado: " + error);
      //}

      console.log("Erro inesperado: " + error);

      console.error(JSON.stringify(error.error)); // log to console instead

      return of(result as T);
    };
  }

  getAuthorizationToken(){
    return this.authDataService.getUserToken();
  }

}
