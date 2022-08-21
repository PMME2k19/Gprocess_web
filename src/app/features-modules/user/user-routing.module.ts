import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecyclingComponent } from './components/containers/recycling/recycling.component';
import { UserComponent } from './components/containers/user/user.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'reciclagem', component: RecyclingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
