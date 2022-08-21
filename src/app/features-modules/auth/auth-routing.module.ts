import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstAccessGuard } from 'src/app/core/guards/first-access.guard';
import { AuthComponent } from './components/containers/auth/auth.component';
import { LoginComponent } from './components/containers/login/login.component';
import { ResetPassComponent } from './components/containers/reset-pass/reset-pass.component';
import { UpdatePassFirstComponent } from './components/containers/update-pass-first/update-pass-first.component';
import { UpdatePassToResetComponent } from './components/containers/update-pass-to-reset/update-pass-to-reset.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'recuperar-palavra-passe', component: ResetPassComponent, pathMatch: 'full' },
      { path: 'actualizar-palavra-passe', component: UpdatePassToResetComponent, pathMatch: 'full' },
      { path: 'primeira-vez', component: UpdatePassFirstComponent, pathMatch: 'full', canActivate: [FirstAccessGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
