import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshData } from 'src/app/base-models/auth/RefreshData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  itemMenu: string = '';
  itemSubMenu: string = '';

  constructor(
    private http : HttpClient,
    private router: Router
  ) { }

  updateItemMenu(itemMenu: string): void{
    this.itemMenu = itemMenu;
  }

  updateItemSubMenu(itemSubMenu: string): void{
    this.itemSubMenu = itemSubMenu;
  }

  refreshToken(refreshData: RefreshData) {

   return this.http.post<any>(`${environment.apiURL}Auth/refreshToken`, refreshData)

  }

  logOut(){
    window.localStorage.removeItem(environment.appName + '_user_name_full');
    window.localStorage.removeItem(environment.appName + '_user_email');
    window.localStorage.removeItem(environment.appName + '_user_profile');
    window.localStorage.removeItem(environment.appName + '_user_token');
    window.localStorage.removeItem(environment.appName + '_user_refresh_token');
    window.localStorage.removeItem(environment.appName + '_user_is_first_acess');
    window.localStorage.removeItem(environment.appName + '_user_default_pass');
    window.localStorage.removeItem(environment.appName + '_user_id');
    this.router.navigate(['/autenticacao/login']);
  }

}
