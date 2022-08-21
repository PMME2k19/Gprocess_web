import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertMsgComponent } from './components/alert-msg/alert-msg.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { DatePipe } from './pipes/date.pipe';
import { EmailInputComponent } from './components/email-input/email-input.component';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from '../core/interceptors/auth-interceptor';
import { ContentMessageModule } from './components/content-message/content-message.module';

@NgModule({
  declarations: [
    CardComponent,
    AlertMsgComponent,
    CardHeaderComponent,
    SearchInputComponent,
    SelectInputComponent,
    DatePipe,
    EmailInputComponent,
    PhoneInputComponent,
    PaginationComponent,
    PaginationComponent,
    SelectUserComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentMessageModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    AlertMsgComponent,
    CardHeaderComponent,
    SelectInputComponent,
    SearchInputComponent,
    DatePipe,
    EmailInputComponent,
    PhoneInputComponent,
    ContentMessageModule,
    PaginationComponent,
    SelectUserComponent,
    RadioButtonComponent,
    CheckboxComponent
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true } ],
})
export class SharedModule { }
