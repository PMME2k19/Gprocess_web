import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/containers/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './api/auth.service';
import { ResetPassComponent } from './components/containers/reset-pass/reset-pass.component';
import { UpdatePassToResetComponent } from './components/containers/update-pass-to-reset/update-pass-to-reset.component';
import { LoginComponent } from './components/containers/login/login.component';
import { UpdatePassFirstComponent } from './components/containers/update-pass-first/update-pass-first.component';


@NgModule({
  declarations: [
    AuthComponent,
    ResetPassComponent,
    UpdatePassToResetComponent,
    LoginComponent,
    UpdatePassFirstComponent
  ],
  imports: [
    AuthRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthService],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
})
export class AuthModule { }
