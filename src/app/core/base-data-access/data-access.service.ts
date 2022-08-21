import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResponseEnum } from 'src/app/base-enums/response-enum';
import { HomeService } from 'src/app/layouts/home/home.service';
import { ResponseModel } from 'src/app/base-models/base/ResponseModel';
import { environment } from 'src/environments/environment';
import { AuthDataService } from '../services/auth-data.service';

@Injectable()
export class DataAccessService {

  myResponseData: ResponseModel = new ResponseModel(ResponseEnum.SUCCESS, null);

  constructor(
    private http : HttpClient,
    private homeService: HomeService,
    private authDataService: AuthDataService
  ) { }

  async addUpdate(data: any, uri: string) : Promise<ResponseModel> {

    //Reutilizar (isolar em um método separado)
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

    const httpOptions = {
      headers: headers_object
    };

    //*****************************************/

    let res = await this.http.post<any>(`${environment.apiURL}` + uri, data, httpOptions)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('addUpdate', []))
    ).toPromise();

    return this.myResponseData;

  }

  async update(data: any, uri: string) : Promise<ResponseModel> {

    //Reutilizar (isolar em um método separado)
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

    const httpOptions = {
      headers: headers_object
    };

    //*****************************************/

    let res = await this.http.put<any>(`${environment.apiURL}` + uri, data, httpOptions)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('addUpdate', []))
    ).toPromise();

    return this.myResponseData;

  }

  async delete(id: string, uri: string) : Promise<ResponseModel> {

    //Reutilizar (isolar em um método separado)
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

    const httpOptions = {
      headers: headers_object,
      body: {
        id: id
      }
    };

    //*****************************************/

    let res = await this.http.delete<any>(`${environment.apiURL}` + uri, httpOptions)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('Delete', []))
    ).toPromise();

    return this.myResponseData;

  }

  async PostQuery(uri: string) : Promise<ResponseModel> {

    //Reutilizar (isolar em um método separado)
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

    console.log("Bearer " + this.getAuthorizationToken());

    const httpOptions = {
      headers: headers_object
    };
    //*****************************************/

    let res = await this.http.post<any>(`${environment.apiURL}` + uri, httpOptions)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('addUpdate', []))
    ).toPromise();

    return this.myResponseData;

  }

  async get(uri: string) : Promise<ResponseModel> {

    //Reutilizar (isolar em um método separado)
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

    const httpOptions = {
      headers: headers_object
    };

    //*****************************************/

    let res = await this.http.get<any>(`${environment.apiURL}` + uri, httpOptions)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('Get', []))
    ).toPromise();

    return this.myResponseData;

  }

  async download(uri: string) : Promise<ResponseModel> {

    //Reutilizar (isolar em um método separado)
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken())

    const httpOptions: any = {
      headers: headers_object,
      responseType: 'blob'
    };

    //*****************************************/

    let res = await this.http.get<any>(`${environment.apiURL}` + uri, httpOptions)
    .pipe(
      tap(_ => this.handleResult(_)),
      catchError(this.handleError<any>('Get', []))
    ).toPromise();

    return this.myResponseData;

  }

  handleResult(resultData: any): void{
    //Montar retorno aqui
    this.myResponseData.data = resultData;
    this.myResponseData.responseEnum = ResponseEnum.SUCCESS;
    console.log('*********HandleResult*********');
    console.log(this.myResponseData);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.myResponseData.data = null;

      this.myResponseData.responseMsg = error.error && error.error.Message ? error.error.Message : "Não foi possível realizar a operação, tente novamente!";

      this.myResponseData.responseEnum = error.status;

      switch(error.status){
        case 0:
          this.myResponseData.responseMsg = "Houve um erro inesperado, por favor tente novamente!";
          //alert(`${operation} failed msg 400: ${error.error.Message}`);
          break;
        case 400:
          //alert(`${operation} failed msg 400: ${error.error.Message}`);
          try{

            this.myResponseData.responseMsg = error.error && error.error.errors ? error.error.errors[0] : "Houve um erro inesperado. Solicitação contém dados inválidos!";

          }catch(error){
            this.myResponseData.responseMsg = "Houve um erro inesperado (no envio da solicitação). Solicitação contém dados inválidos!";
          }
          break;
        case 401:
          this.myResponseData.responseMsg = "A sua sessão expirou, entre novamente!";
          this.homeService.logOut();
          //alert(`${operation} failed msg 401: ${JSON.stringify(error)}`);
          break;
        case 404:
          this.myResponseData.responseMsg = "Não foram encontrados nenhum resultado!";
          //alert(`${operation} failed msg 404: ${error.error.Message}`);
          break;
        case 500:

          this.myResponseData.responseMsg = "Houve um erro ao processar o Pedido, por favor tente novamente!";

          //alert(`${operation} failed msg 500: ${error.error.Message}`);
          break;
      }

      console.log('*********HandleError*********');

      // TODO: send the error to remote logging infrastructure
      console.error(JSON.stringify(error)); // log to console instead
      console.error(error);

      // TODO: better job of transforming error for user consumption
      //console.log(`${operation} failed msg 1: ${error.error.Message}`);
      //console.log(`${operation} failed msg 2: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAuthorizationToken(){
    return this.authDataService.getUserToken();
  }

  getAsObservable(url: string): Observable<ResponseModel>{
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.getAuthorizationToken());

    const httpOptions = {
      headers: headers_object
    };

    return this.http.get<any>(`${environment.apiURL}${url}`, httpOptions).pipe(
      catchError(this.handleError<any>('Get', []))
    );
  }


  /*list(search: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiURL}/todos?search=${search}`);
  }

  create(todo: TodoInsert): Observable<Todo> {
    return this.http.post<Todo>(`${environment.apiURL}/todos`, todo);
  }

  remove(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.apiURL}/todos/${id}`);
  }

  toggleCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiURL}/todos/${id}`, {isCompleted});
  }*/

}
