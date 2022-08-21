import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListFacade } from './list.facade';
import { DataAccessModule } from 'src/app/core/base-data-access/data-access.module';
import { ListState } from './state/list.state';
import { ListComponent } from './components/containers/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GetClassActualStatePipe } from './pipes/get-class-actual-state.pipe';


@NgModule({
  declarations: [
    ListComponent,
    GetClassActualStatePipe,
  ],
  providers: [ListFacade, ListState],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    DataAccessModule
  ]
})
export class ListModule { }
