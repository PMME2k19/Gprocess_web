import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProcessComponent } from './components/containers/detail-process/detail-process.component';

const routes: Routes = [
  { path: ':id', component: DetailProcessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailProcessRoutingModule { }
