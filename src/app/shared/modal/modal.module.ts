import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMainComponent } from './modal-main/modal-main.component';
import { ModalService } from './modal.service';

@NgModule({
  declarations: [
    ModalMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalMainComponent
  ],
  providers: [ModalService]
})
export class ModalModule { }
