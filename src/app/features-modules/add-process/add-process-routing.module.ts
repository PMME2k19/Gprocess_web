import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProcessComponent } from './components/containers/add-process/add-process.component';

const routes: Routes = [{ path: '', component: AddProcessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProcessRoutingModule { }
