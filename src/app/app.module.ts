import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './core/components/aside/aside.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HomeComponent } from './layouts/home/home.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { NotificationLayoutComponent } from './shared/notification/notification-layout/notification-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { ContentMessageModule } from './shared/components/content-message/content-message.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    HomeComponent,
    AuthComponent,
    NotificationLayoutComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ContentMessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
