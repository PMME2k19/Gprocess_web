import { animate, state, style, transition, trigger } from '@angular/animations';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ContentMessageEnum } from 'src/app/base-enums/content-message.enum';
import { AuthDataService } from 'src/app/core/services/auth-data.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('toggleHeight', [
      state('hide', style({
          height: '0px',
          opacity: '0',
          overflow: 'hidden'
      })),
      state('show', style({
          height: '*',
          opacity: '1'
      })),
      transition('hide => show', animate('200ms ease-in')),
      transition('show => hide', animate('200ms ease-out'))
    ])
  ],
})
export class HomeComponent implements OnInit {

  gridColumnMain: string = '262px 1fr';
  leftNav: string = '0';

  userNameApp: string = '';
  userEmailApp: string = '';
  userProfileApp: string = '';
  listOpen: boolean = true;
  transform: string = 'rotate(180deg)';

  //******************************* */

  displayUserOptions: Boolean = false;
  displaynotifications: Boolean = false;
  totalNotifications: number = 0;
  contentMessageEnum = ContentMessageEnum;

  displayItemsAbout: string = 'none';

  ano = new Date().getFullYear();

  constructor(
    public homeService: HomeService,
    private authDataService: AuthDataService,
    private msgServices: NotificationService
  ) { }

  ngOnInit(): void {

    let fullName = this.authDataService.getUserName();
    let email = this.authDataService.getUserEmail();
    let profile = this.authDataService.getUserProfile();

    if(fullName == null || email == null || profile == null){
      this.homeService.logOut();
    }

    console.log('Dados do user');
    console.log(fullName, email, profile);

    let names = `${fullName}`.split(' ');
    let userName = names[0] + " " + names[names.length - 1];

    this.userNameApp = userName;
    this.userEmailApp = email ?? '';
    this.userProfileApp = profile ?? '';
  }

  toggleNotifications() {
    this.displaynotifications = !this.displaynotifications;
  }

  closeNotifications() {
    this.displaynotifications = false;
  }

  toggleMenu(){
    if (this.leftNav == '0'){
      this.leftNav = '-262px';

      setTimeout(() => {
        this.gridColumnMain = '0 1fr';
      }, 500);

    }else{
      this.leftNav = '0';
      this.gridColumnMain = '262px 1fr';
    }
  }

  selectSetting(){
    this.msgServices.info("Esta funcionalidade não está disponível no momento!");
  }

  toggleUserOptions(){
    this.displayUserOptions = !this.displayUserOptions;
  }

  closeUserOptions(){
    this.displayUserOptions = false;
  }

  logOut(){
    this.homeService.logOut();
  }
}
