import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { UserFacade } from '../../../facades/user.facade';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() currentUser!: UserModel;
  loading = false;

  constructor(
    private userFacade: UserFacade,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  async removerUser(){
    this.loading = true;

    const result = await this.userFacade.removeUser(this.currentUser.id);

    this.loading = false;

    if(result) {
      this.closeModal()
    }
  }

  closeModal(){
    this.modalService.closeModal();
  }

}
