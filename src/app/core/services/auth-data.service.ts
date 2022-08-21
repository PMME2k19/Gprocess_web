import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor() { }

  public getUserName(): string {
    return localStorage.getItem(environment.appName + '_user_name_full') || '';
  }

  public setUserName(name: string): void {
    window.localStorage.setItem(environment.appName + '_user_name_full', name);
  }

  public getUserEmail(): string {
    return localStorage.getItem(environment.appName + '_user_email') || '';
  }

  public setUserEmail(email: string): void {
    window.localStorage.setItem(environment.appName + '_user_email', email);
  }

  public getUserProfile(): string {
    return localStorage.getItem(environment.appName + '_user_profile') || '';
  }

  public setUserProfile(profile: string): void {
    window.localStorage.setItem(environment.appName + '_user_profile', profile);
  }

  public getUserToken(): string {
    return localStorage.getItem(environment.appName + '_user_token') || '';
  }

  public setUserToken(token: string): void {
    window.localStorage.setItem(environment.appName + '_user_token', token);
  }

  public getUserRefreshToken(): string {
    return localStorage.getItem(environment.appName + '_user_refresh_token') || '';
  }

  public setUserRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(environment.appName + '_user_refresh_token', refreshToken);
  }

  public getUserDefaultPass(): string {
    return localStorage.getItem(environment.appName + '_user_default_pass') || '';
  }

  public setUserDefaultPass(pass: string): void {
    window.localStorage.setItem(environment.appName + '_user_default_pass', pass);
  }

  public getIsFirstAcess(): boolean {
    const value = localStorage.getItem(environment.appName + '_user_is_first_acess');
    return (value == 'true');
  }

  public setIsFirstAcess(isFirstAcess: any): void {
    window.localStorage.setItem(environment.appName + '_user_is_first_acess', isFirstAcess);
  }

  public getUserId(): string {
    return localStorage.getItem(environment.appName + '_user_id') || '';
  }

  public setUserId(id: string): void {
    window.localStorage.setItem(environment.appName + '_user_id', id);
  }

}
