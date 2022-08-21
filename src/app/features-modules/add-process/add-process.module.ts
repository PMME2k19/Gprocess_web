import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProcessRoutingModule } from './add-process-routing.module';
import { AddProcessComponent } from './components/containers/add-process/add-process.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddProcessState } from './state/add-process.state';
import { AddProcessFacade } from './add-process.facade';
import { DataAccessModule } from 'src/app/core/base-data-access/data-access.module';


@NgModule({
  declarations: [
    AddProcessComponent
  ],
  imports: [
    CommonModule,
    AddProcessRoutingModule,
    SharedModule,
    DataAccessModule
  ],
  providers: [
    AddProcessFacade,
    AddProcessState
  ]
})
export class AddProcessModule { }
