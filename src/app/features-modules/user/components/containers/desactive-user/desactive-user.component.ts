import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { UserFacade } from '../../../facades/user.facade';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-desactive-user',
  templateUrl: './desactive-user.component.html',
  styleUrls: ['./desactive-user.component.css']
})
export class DesactiveUserComponent implements OnInit {

  @Input() currentUser!: UserModel;
  loading = false;
  isBloqueado = false;

  constructor(
    private userFacade: UserFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.isBloqueado = this.currentUser.isBloqueado;
  }

  async desativarUser(){
    this.loading = true;

    const result = await this.userFacade.blockUser(this.currentUser.id, this.currentUser.isBloqueado);

    this.loading = false;

    if(result) {
      this.closeModal()
    }
  }

  closeModal(){
    this.modalService.closeModal();
  }

}
