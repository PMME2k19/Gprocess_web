import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './layouts/home/home.component';

const routes: Routes = [
    { 
      path: '',
      component: HomeComponent,
      children: [
        { 
          path: '', redirectTo: 'processos', pathMatch: 'full' 
        },
        { 
          path: 'processos', loadChildren: () => import('./features-modules/list/list.module').then(m => m.ListModule) 
        },    
        /*{ 
          path: 'processos-privados', loadChildren: () => import('./features-modules/list/list.module').then(m => m.ListModule) 
        },*/ 
        { 
          path: 'relatorio', loadChildren: () => import('./features-modules/report/report.module').then(m => m.ReportModule) 
        },    
        { 
          path: 'registo-de-documento', loadChildren: () => import('./features-modules/add-process/add-process.module').then(m => m.AddProcessModule) 
        },
        { 
          path: 'detalhe-de-documento', loadChildren: () => import('./features-modules/detail-process/detail-process.module').then(m => m.DetailProcessModule) 
        },    
        { 
          path: 'utilizadores', loadChildren: () => import('./features-modules/user/user.module').then(m => m.UserModule) 
        },    
        { 
          path: 'definicoes', loadChildren: () => import('./features-modules/setting/setting.module').then(m => m.SettingModule) 
        },
      ],
      canActivate: [AuthGuard]
    },
    {
      path: '', 
      component: AuthComponent,
      children: [
        { 
          path: '', redirectTo: 'autenticacao', pathMatch: 'full' 
        },
        { 
          path: 'autenticacao', loadChildren: () => import('./features-modules/auth/auth.module').then(m => m.AuthModule), 
          canActivate: [GuestGuard]
        },
      ]
    }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
