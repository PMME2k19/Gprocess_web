import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthDataService } from '../services/auth-data.service';
import { HomeService } from 'src/app/layouts/home/home.service';
import { RefreshData } from 'src/app/base-models/auth/RefreshData';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {

    isRefreshing = false;

    constructor(
        private homeService: HomeService,
        private authDataService: AuthDataService,
        private notificationService: NotificationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      let authreq = request;

      return next.handle(authreq).pipe(
        catchError(errordata => {
          if (errordata.status === 401) {
            if(this.isRefreshing == false){
              return this.handleRefrehToken(request, next);
            }
            else{
              this.isRefreshing = false;
              this.homeService.logOut();
            }
          }
          return throwError(errordata);
        })
      );
    }

    private addToken(request: HttpRequest<any>, accessToken: string) {
        return request.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` }
        });
    }

    private setTokens(resultData: any) {
        this.authDataService.setUserToken(resultData.data.accessToken.token);
        this.authDataService.setUserRefreshToken(resultData.data.refreshToken);
    }

    handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
      this.isRefreshing = true;

      const userRefresh: RefreshData = {
        accessToken: this.authDataService.getUserToken(),
        refreshToken: this.authDataService.getUserRefreshToken()
      };

      return this.homeService.refreshToken(userRefresh).pipe(
        switchMap((resultData: any) => {
          this.setTokens(resultData);
          this.isRefreshing = false;
          this.notificationService.success('A sua sessão foi renovada!');
          return next.handle(this.addToken(request, resultData.data.accessToken.token));
        }),
        catchError(errodata => {
          this.homeService.logOut();
          return throwError(errodata);
        })
      );
    }
}
