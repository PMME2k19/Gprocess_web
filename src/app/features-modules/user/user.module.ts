import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/containers/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFacade } from './facades/user.facade';
import { UserState } from './state/user.state';
import { DataAccessModule } from 'src/app/core/base-data-access/data-access.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { CreateUserComponent } from './components/containers/create-user/create-user.component';
import { EditUserComponent } from './components/containers/edit-user/edit-user.component';
import { RecyclingComponent } from './components/containers/recycling/recycling.component';
import { RecycleFacade } from './facades/recycle.facade';
import { RecycleState } from './state/recycle.state';
import { DeleteUserComponent } from './components/containers/delete-user/delete-user.component';
import { DesactiveUserComponent } from './components/containers/desactive-user/desactive-user.component';


@NgModule({
  declarations: [
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    RecyclingComponent,
    DeleteUserComponent,
    DesactiveUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    DataAccessModule,
    ModalModule
  ],
  providers: [
    UserFacade,
    RecycleFacade,
    UserState,
    RecycleState
  ]
})
export class UserModule { }
